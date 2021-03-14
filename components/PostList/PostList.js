import React from 'react'
import Link from 'next/link'

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

export default class PostList extends React.Component {
    render() {
        return (
            <div id={'posts'} className={'min-w-full px-32 py-12 flex flex-1 flex-col justify-center items-center bg-home-main-light bg-gradient-to-b dark:from-home-dark-900 dark:to-home-dark-900'}>
                <span className={'text-3xl font-semibold pt-5 -mt-3 text-home-secondary-600 dark:text-home-secondary-300'}>
                    Posts
                </span>
                <div className={'grid grid-cols-2 lg:grid-cols-3 overflow-x-auto py-4 gap-8'}>
                    {this.props.posts.map((post) => (
                        <Link
                        as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                        href={`/posts/[slug]`}
                        key={post.filePath}
                        >
                            <a className={'group block px-4 py-5 bg-home-primary-50 dark:bg-home-dark-800 rounded-md shadow-md'}>
                                <p className={'text-sm text-gray-400 font-semibold'}>{post.data.date ? formatDate(post.data.date) : <br />}</p>
                                <p className={'font-semibold dark:text-home-primary-400 group-hover:text-home-secondary-700 group-hover:underline dark:group-hover:text-home-secondary-400'}>
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
    };
}