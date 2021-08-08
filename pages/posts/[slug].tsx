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
import { POSTS_PATH, postFilePaths } from "@/utils/posts";
import SideBar from "@/components/SideBar";
import { getSortedPostsMeta } from "@/lib/getPosts";
const Slugger = require("github-slugger");
import { PostMeta, Heading } from "@/lib/types";
import { codeBase } from "@/utils/siteInfo";
import rehypeMeta from "@/utils/rehypeMeta";
import Reactive from '@/components/Reactive'

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.2/dist/katex.css"
          integrity="sha384-2vkq42dvFAQl88n6UuPWLKSKnFnHyyoSgy788ohlfWZ4xEmF8g0kCMZe1CkaXHDd"
          crossOrigin="anonymous"
        />
        <title>{frontMatter.title}</title>
        <meta
          name="description"
          content={`${frontMatter.preview || frontMatter.title}`}
        />
      </Head>
      <NavBar page="blog" />
      <div
        className={
          "min-w-full pt-28 sm:px-8 md:px-16 grid grid-cols-5 gap-10 bg-white dark:bg-dark-900"
        }
      >
        <h1
          className={
            "col-start-2 col-end-5 justify-self-center text-5xl font-bold text-primary-900 dark:text-primary-400"
          }
        >
          {frontMatter.title}
        </h1>
        <div
          className={`max-w-4xl w-full mx-auto px-8 sm:px-10 ${
            headings.length !== 0 ? "md:col-end-5 md:pr-0" : ""
          } 2xl:pl-0 col-start-1 col-end-6 2xl:col-start-2 justify-self-stretch bg-white dark:bg-dark-900`}
        >
          <div className="dark:text-dark-50 prose dark:prose-dark !max-w-none">
          <Content components={MDXComponents} />
          </div>
          <Reactive />
        </div>
        {headings.length !== 0 && (
          <div
            className={
              "col-start-5 col-end-6 row-start-2 row-end-3 hidden md:block"
            }
          >
            <TableOfContents headings={headings} />
          </div>
        )}
        <div
          className={
            "col-start-1 col-end-6 md:col-end-5 2xl:col-end-2 row-start-3 2xl:row-start-2 2xl:row-end-3 px-10 md:pr-0 max-w-4xl w-full mx-auto"
          }
        >
          <SideBar prev={prev} curr={{ slug, data: frontMatter }} next={next} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getSortedPostsMeta();
  const postIndex = posts.findIndex((post) => post.slug === params.slug);
  const prev = posts[postIndex + 1] || null;
  const next = posts[postIndex - 1] || null;
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
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

  const { code: mdxSource } = await bundleMDX(content, {
    cwd: POSTS_PATH,
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        require("remark-math"),
        require("remark-slug"),
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        require("rehype-katex"),
        rehypeMeta,
      ];
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
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx$/, ""))
    .map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};
