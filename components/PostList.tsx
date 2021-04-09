import { PostMeta } from '../lib/types';
import { postsDir } from '../utils/routes';
import formatDate from '../utils/formatDate';
import Link from 'next/link';
import React from 'react';

const TagSection = ({ tags }: { tags: string[] }) => {
    const totalTags = tags.length;
    return (
        <div className={'pb-4'}>
            <div className={'text-blog-primary-700 dark:text-blog-primary-400'}>
            {tags.map((tag, index) => (
                <React.Fragment key={tag}>
                    <span className={`${index !== 0 && 'pl-2'} ${index !== totalTags - 1 && 'pr-2'} uppercase text-sm text-blog-primary-500`}>{tag}</span>
                    {index != totalTags - 1 && '•'}
                </React.Fragment>
            ))}
            </div>
        </div>
    );
}

const PostList = ({ posts }: { posts: PostMeta[] }) => {
    return (
        <div className={'max-w-3xl xl:max-w-5xl mx-auto px-4 py-12 flex flex-col justify-between bg-blog-main-light dark:bg-blog-gray-900'}>
            <h1 className={'text-2xl self-center font-semibold uppercase text-blog-primary-600 dark:text-blog-primary-500'}>
                Posts
            </h1>
            <ul className={'divide-y'}>
                {posts.map((post) => {
                    const dedupedTags: string[] = Array.from(new Set(post.data.tags));
                    return (
                        <li className={'py-12 divide-blog-gray-200'}>
                            <div className={'grid grid-cols-4'}>
                                <p className={'text-base text-blog-gray-500 col-start-1'}>
                                    {post.data.date ? formatDate(post.data.date) : null}
                                </p>
                                <div className={'col-start-2 col-end-5 block px-4 '}>
                                    <Link
                                        as={`/${postsDir}/${post.slug}`}
                                        href={`/${postsDir}/[slug]`}
                                        key={post.slug}
                                    >
                                        <a className={'text-2xl tracking-tight font-semibold text-blog-primary-600 dark:text-blog-primary-400'}>
                                            {post.data.title}
                                        </a>
                                    </Link>
                                    {dedupedTags.length > 0 && <TagSection tags={dedupedTags}/>}
                                    <p className={'text-blog-gray-600 dark:text-white'} style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                                        {post.data.preview}
                                    </p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default PostList;