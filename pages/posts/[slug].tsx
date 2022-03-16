import React from "react";
import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import path from "path";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import MDXComponents from "@/markdown/MDXComponents";
import NavBar from "@/components/NavBar";
import TableOfContents from "@/components/TableOfContents";
import { POSTS_PATH, postFiles } from "@/utils/posts";
import SideBar from "@/components/SideBar";
import { getSortedPosts } from "@/lib/getPosts";
const Slugger = require("github-slugger");
import { PostMeta, Heading } from "@/lib/types";
import { codeBase } from "@/utils/siteInfo";
import { rehypeImgSize, rehypeMeta } from "@/utils/rehype";
import { remarkParseDirectives } from "@/utils/remark";
import dynamic from "next/dynamic";
const Reactive = dynamic(() => import("../../components/Reactive"));
import { remarkMdxImages } from "remark-mdx-images";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

type PostPageProps = {
  source: string;
  frontMatter: {
    [key: string]: string;
  };
  slug: string;
  headings: Heading[];
  prev: PostMeta;
  next: PostMeta;
};

export default function PostPage({
  source,
  frontMatter,
  slug,
  headings,
  prev,
  next,
}: PostPageProps) {
  const Content = React.useMemo(
    () => getMDXComponent(source, frontMatter),
    [source, frontMatter]
  );
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta
          name="description"
          content={`${frontMatter.preview || frontMatter.title}`}
        />
      </Head>
      <NavBar />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-5 gap-10 bg-white pt-28 dark:bg-dark-900 sm:px-8 md:px-16 2xl:px-0">
        <h1 className="col-start-1 col-end-6 mx-auto w-full max-w-3xl justify-self-center px-8 text-center text-5xl font-bold text-primary-900 dark:text-primary-400 sm:px-10 lg:col-end-5 lg:pr-0 2xl:col-start-2 2xl:pl-0">
          {frontMatter.title}
        </h1>
        <div className="col-start-1 col-end-6 mx-auto w-full max-w-3xl justify-self-stretch bg-white px-8 dark:bg-dark-900 sm:px-10 lg:col-end-5 lg:pr-0 2xl:col-start-2 2xl:pl-0">
          <div className="prose !max-w-none prose-code:before:content-none prose-code:after:content-none dark:prose-invert dark:prose-dark">
            <Content components={MDXComponents} />
          </div>
          <Reactive reactionText={frontMatter.reactiveText} />
        </div>
        {headings.length !== 0 && (
          <div
            className={
              "col-start-5 col-end-6 row-start-2 row-end-3 hidden lg:block"
            }
          >
            <TableOfContents headings={headings} />
          </div>
        )}
        <div className="col-start-1 col-end-6 row-start-3 mx-auto w-full max-w-3xl justify-self-stretch px-10 lg:col-end-5 lg:pr-0 2xl:col-end-2 2xl:row-start-2 2xl:row-end-3">
          <SideBar prev={prev} curr={{ slug, data: frontMatter }} next={next} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getSortedPosts();
  const postIndex = posts.findIndex((post) => post.slug === params.slug);
  const post = posts[postIndex];
  const prev = posts[postIndex + 1] || null;
  const next = posts[postIndex - 1] || null;
  const postFilePath = path.join(POSTS_PATH, post.path);
  const source = fs.readFileSync(postFilePath, "utf-8");
  const { content, data } = matter(source, {});

  //get headings
  const lines = content.split("\n");
  const slugger = new Slugger();
  const headings = [];
  lines.forEach((line) => {
    const matches = line.match(/#{1,6} /);
    if (matches !== null) {
      const headtext = line.replace(matches[0], "");
      headings.push({ text: headtext, anchor: slugger.slug(headtext) });
    }
  });

  //fetch code from github
  if (data?.code && typeof data.code === "object") {
    const codelinks = {};
    for (const [key, value] of Object.entries(data.code)) {
      let link = value as string;
      if (!link.startsWith("https://github.com")) {
        link = codeBase + link;
      }
      codelinks[key] = link;
      const rawlink = link
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/");
      const request = await fetch(rawlink);
      const code = await request.text();
      data.code[key] = code;
    }
    data.code.links = codelinks;
  }

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    "node_modules",
    "esbuild",
    "bin",
    "esbuild"
  );

  const cwd = path.join(POSTS_PATH, post.path, "..");
  const { code: mdxSource } = await bundleMDX({
    source: content,
    cwd,
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMath,
        remarkMdxImages,
        remarkGfm,
        remarkDirective,
        remarkParseDirectives,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeKatex,
        rehypeMeta,
        [rehypeImgSize, { dir: cwd }],
        rehypeSlug,
      ];
      return options;
    },
    esbuildOptions(options) {
      options.outdir = path.join(
        process.cwd(),
        "public",
        "images",
        "posts",
        post.slug
      );
      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
        ".jpeg": "file",
        ".mp4": "file",
      };
      options.publicPath = `/images/posts/${post.slug}`;
      options.write = true;
      return options;
    },
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
      headings,
      prev,
      next,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFiles.map((file) => ({ params: { slug: file.slug } }));
  return {
    paths,
    fallback: false,
  };
};
