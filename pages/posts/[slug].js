import fs from 'fs';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import path from 'path';
import Head from 'next/head';
import AllComponents from '../../components/AllComponents';
import NavBar from '../../components/NavBar';
import TableOfContents from '../../components/TableOfContents';
import { POSTS_PATH, postFilePaths } from '../../utils/posts'
import SideBar from '../../components/SideBar';
import getSortedPosts from '../../lib/getSortedPosts';
const Slugger = require('github-slugger');

export default function PostPage({ source, frontMatter, slug, headings, prev, next }) {
    //console.log(source.renderedOutput);
    const content = hydrate(source, {components: AllComponents});
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.2/dist/katex.css" integrity="sha384-2vkq42dvFAQl88n6UuPWLKSKnFnHyyoSgy788ohlfWZ4xEmF8g0kCMZe1CkaXHDd" crossOrigin="anonymous" />
            </Head>
            <NavBar page='blog'/>
            <div className={'min-w-full pt-28 grid grid-cols-5 gap-10 bg-blog-main-light dark:bg-blog-main-dark'}>
                <h1 className={'col-start-2 col-end-5 justify-self-center text-5xl font-bold text-blog-header-900 dark:text-blog-header-400'}>
                    {frontMatter.title}
                </h1>
                <div className={'col-start-1 col-end-6 md:col-end-5 lg:col-end-2 row-start-3 lg:row-start-2 lg:row-end-3 px-10 md:pr-0'}>
                    <SideBar prev={prev} curr={{slug, data: frontMatter}} next={next} />
                </div>
                <div className={'max-w-full px-10 md:pr-0 lg:pl-0 col-start-1 col-end-6 md:col-end-5 lg:col-start-2 justify-self-center prose dark:prose-dark bg-blog-main-light dark:bg-blog-main-dark dark:text-blog-gray-50'}>
                    <div>
                        {content}
                    </div>
                </div>
                <div className={'col-start-5 col-end-6 row-start-2 row-end-3 hidden md:block pr-10'}>
                    <TableOfContents headings={headings}/>
                </div>
            </div>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const posts = getSortedPosts().map(post => ({
        slug: post.slug, 
        data: post.data
    }));
    const postIndex = posts.findIndex(post => post.slug === params.slug);
    const prev = posts[postIndex - 1] || null;
    const next = posts[postIndex + 1] || null;
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
    const source = fs.readFileSync(postFilePath);
    const { content, data } = matter(source);
    const lines = content.split('\n');
    //console.log(lines);
    const slugger = new Slugger();
    const headings = [];
    lines.forEach((line) => {
        const matches = line.match(/#{1,6} /);
        if (matches !== null) {
            const headtext = line.replace(matches[0], '');
            headings.push({text: headtext, anchor: slugger.slug(headtext)});
        }
    });
    const mdxSource = await renderToString(content, {
        components: AllComponents,
        mdxOptions: {
            remarkPlugins: [
                [
                    require('remark-math'),
                ],
                [
                    require('remark-slug'),
                ]
            ],
            rehypePlugins: [
                [
                    require('rehype-katex'),
                ],
            ],
        },
        scope: data,
    });
    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            slug: params.slug,
            headings,
            prev,
            next
        },
    }
}

export const getStaticPaths = async () => {
    const paths = postFilePaths
        .map((path) => path.replace(/\.mdx$/, ''))
        .map((slug) => ({ params: { slug } }));
    return {
        paths,
        fallback: false,
    }
}
