import { PostMeta } from '../lib/types';
import { postsDir } from '../utils/routes';
import formatDate from '../utils/formatDate';
import Link from 'next/link';
import React from 'react';
import NavBar from './NavBar';

const TagSection = ({ tags }: { tags: string[] }) => {
    const totalTags = tags.length;
    return (
        <div>
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
        <div className={'w-full bg-blog-main-light dark:bg-blog-main-dark'}>
        <NavBar page={'blog'}/>
        <div className={'max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 py-12 flex flex-col justify-between'}>
            <h1 className={'pt-20 text-5xl font-bold text-blog-gray-900 dark:text-blog-gray-100'}>
                Posts
            </h1>
            <ul className={'divide-y dark:divide-blog-gray-600'}>
                {posts.map((post) => {
                    const dedupedTags: string[] = Array.from(new Set(post.data.tags));
                    return (
                        <li key={post.slug} className={'py-12 divide-blog-gray-200'}>
                            <div className={'lg:grid lg:grid-cols-4'}>
                                {post.data.date && 
                                <p className={'text-base text-blog-gray-500 dark:text-blog-gray-400 lg:col-start-1 pb-2'}>
                                    {formatDate(post.data.date)}
                                </p>
                                }
                                <div className={'lg:col-start-2 lg:col-end-5'}>
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
                                    {post.data.preview && 
                                    <p className={'text-blog-gray-600 dark:text-blog-gray-200 pt-6'} style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                                        {post.data.preview}
                                    </p>
                                    }
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
        </div>
    )
}

export default PostList;