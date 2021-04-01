import React from 'react'
import Link from 'next/link'
import { postsDir } from '../../utils/postsDir';

const formatDate = (date) => {
    let parsed;
    if (date.search('-') !== -1) {
        parsed = date.split('-').map(s => parseInt(s));
    }
    else {
        parsed = date.split('/');
    }
    if (parsed[2] < 1000) {
        parsed[2] += 2000;
    }
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date(parsed[2], parsed[0] - 1, parsed[1]).toLocaleDateString(
        'en-US',
        options
    );
    return formattedDate;
}

const PostList = React.forwardRef((props, ref) => {
    return (
        <div id={'posts'} ref={ref} className={'min-w-full px-32 py-12 flex flex-1 flex-col justify-center items-center bg-home-main-light bg-gradient-to-b dark:bg-home-gray-900'}>
            <span className={'text-2xl font-semibold uppercase pt-5 -mt-3 text-home-primary-600 dark:text-home-primary-500'}>
                Posts
            </span>
            <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto py-4 gap-8'}>
                {props.posts.map((post) => (
                    <Link
                        as={`/${postsDir}/${post.filePath.replace(/\.mdx?$/, '')}`}
                        href={`/${postsDir}/[slug]`}
                        key={post.filePath}
                    >
                        <a className={'group block px-4 py-5 bg-home-primary-50 dark:bg-home-gray-800 border border-home-primary-200 rounded-md hover:shadow-lg hover:border-0 hover:rounded-none'}>
                            <p className={'text-sm text-gray-400 font-semibold'}>
                                {post.data.date ? formatDate(post.data.date) : <br />}
                            </p>
                            <p className={'font-semibold text-home-primary-600 dark:text-home-primary-400 group-hover:text-home-contrast-600 group-hover:underline dark:group-hover:text-home-contrast-300'}>
                                {post.data.title}
                            </p>
                            <p className={'text-gray-600 dark:text-white'} style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                                {post.data.preview}
                            </p>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
});

export default PostList;