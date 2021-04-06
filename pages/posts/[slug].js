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
import { getAnchor } from '../../utils/anchor';
import SideBar from '../../components/SideBar';
import getSortedPosts from '../../lib/getSortedPosts';

export default function PostPage({ source, frontMatter, headings, prev, next }) {
    const content = hydrate(source, {components: AllComponents});
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.min.css" integrity="sha384-t5CR+zwDAROtph0PXGte6ia8heboACF9R5l/DiY+WZ3P2lxNgvJkQk5n7GPvLMYw" crossOrigin="anonymous" />
            </Head>
            <NavBar page='blog'/>
            <div className={'min-w-full pt-28 grid grid-cols-5 gap-10 bg-blog-main-light dark:bg-blog-main-dark'}>
                <h1 className={'col-start-2 col-end-5 justify-self-center self-center text-5xl font-bold text-blog-header-900 dark:text-blog-header-400'}>
                    {frontMatter.title}
                </h1>
                <div className={'hidden lg:block col-start-1 col-end-2 row-start-2 row-end-3 pl-8'}>
                    <SideBar prev={prev} next={next} />
                </div>
                <div className={'max-w-full px-10 md:pr-0 lg:pl-0 col-start-1 col-end-6 md:col-end-5 lg:col-start-2 justify-self-center prose dark:prose-dark bg-blog-main-light dark:bg-blog-main-dark dark:text-blog-gray-50'}>
                    {content}
                </div>
                <div className={'col-start-5 col-end-6 row-start-2 row-end-3 hidden md:block pr-8'}>
                    <TableOfContents headings={headings}/>
                </div>
            </div>
        </>
    );
}

export const getStaticProps = async ({ params }) => {
    const posts = getSortedPosts();
    const postIndex = posts.findIndex(post => post.slug === params.slug);
    const prev = posts[postIndex - 1] || null;
    const next = posts[postIndex + 1] || null;
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
    const source = fs.readFileSync(postFilePath);
    const { content, data } = matter(source);
    const lines = content.split('\n');
    //console.log(lines);
    const headings = [];
    lines.forEach((line) => {
        const matches = line.match(/#{1,6} /);
        if (matches !== null) {
            const headtext = line.replace(matches[0], '');
            headings.push({text: headtext, anchor: getAnchor(headtext)});
        }
    });
    const mdxSource = await renderToString(content, {
        components: AllComponents,
        mdxOptions: {
            remarkPlugins: [
                [
                    require('remark-math'),
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
