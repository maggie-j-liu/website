import React from 'react'
import Link from 'next/link'
import { postsDir } from '../utils/routes';
import formatDate from '../utils/formatDate';
import { PostMeta } from '../lib/types';

const TagSection = ({ tags }: { tags: string[] }) => {
    const totalTags = tags.length;
    return (
        <div className={'py-4'}>
            <p className={'uppercase text-sm font-semibold text-home-gray-400'}>Tags</p>
            <div className={'text-home-primary-700 dark:text-home-primary-400'}>
            {tags.map((tag, index) => (
                <React.Fragment key={tag}>
                    <span className={`${index !== 0 && 'pl-2'} ${index !== totalTags - 1 && 'pr-2'} uppercase text-sm text-home-primary-500`}>{tag}</span>
                    {index != totalTags - 1 && '•'}
                </React.Fragment>
            ))}
            </div>
        </div>
    );
}

const PostGridList = React.forwardRef<HTMLDivElement, { posts: PostMeta[] }>((props, ref) => {
    return (
        <div id={'posts'} ref={ref} className={'min-w-full px-32 py-12 flex flex-1 flex-col justify-center items-center bg-home-main-light bg-gradient-to-b dark:bg-home-gray-900'}>
            <span className={'text-2xl font-semibold uppercase pt-5 -mt-3 text-home-primary-600 dark:text-home-primary-500'}>
                Posts
            </span>
            <div className={'grid grid-cols-1 auto-rows-[230px] sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto py-4 gap-8'}>
                {props.posts.map((post) => {
                    const dedupedTags: string[] = Array.from(new Set(post.data.tags));
                    
                    return (
                        <Link
                            as={`/${postsDir}/${post.slug}`}
                            href={`/${postsDir}/[slug]`}
                            key={post.slug}
                        >
                            <a className={'group block px-4 py-5 bg-home-primary-50 dark:bg-home-gray-800 border border-home-primary-200 dark:border-home-gray-600 rounded-md hover:shadow-lg hover:border-0 hover:rounded-none'}>
                                <p className={'text-sm text-home-gray-400 font-semibold'}>
                                    {post.data.date ? formatDate(post.data.date) : <br />}
                                </p>
                                <p className={'font-semibold text-home-primary-600 dark:text-home-primary-400 group-hover:text-home-contrast-600 group-hover:underline dark:group-hover:text-home-contrast-300'}>
                                    {post.data.title}
                                </p>
                                <p className={'text-gray-600 dark:text-white'} style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                                    {post.data.preview}
                                </p>
                                {dedupedTags.length > 0 && <TagSection tags={dedupedTags}/>}
                            </a>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
});

export default PostGridList;