import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import NavBar from '../components/NavBar/NavBar';
import PostList from '../components/PostList/PostList';
import { POSTS_PATH, postFilePaths } from '../utils/posts';

export default function Home({posts}) {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <div className={'bg-gradient-to-b from-home-secondary-100 to-home-contrast-50 dark:from-home-secondary-900 dark:to-home-contrast-900 min-w-full min-h-screen p-20 flex flex-1 flex-col justify-center items-center'}>
                <h1 className={'text-8xl font-bold bg-gradient-to-br from-home-primary-700 to-home-contrast-300 dark:from-home-primary-400 dark:to-home-contrast-300 text-transparent bg-clip-text mb-8'}>
                    Hello, world!
                </h1>
                <Link href={'#posts'}>
                    <a>
                        <svg className="text-home-primary-400 dark:text-home-primary-200 w-12 h-12 relative top-40 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                        </svg>
                    </a>
                </Link>
            </div>
            <PostList posts={posts}/>
        </div>
    );
}

export function getStaticProps() {
    const posts = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
        const { content, data } = matter(source);
        return {
            content, data, filePath,
        }
    })
    
    posts.sort((a, b) => {
        if (a.data.date && b.data.date) {
            const datea = new Date(a.data.date);
            const dateb = new Date(b.data.date);
            return (datea > dateb ? -1 : 1);
        }
        return (a.date != undefined ? -1 : (b.date != undefined ? 1 : 0 ));
    });
    //console.log(posts);
    return {
        props: {posts}
    }
}
