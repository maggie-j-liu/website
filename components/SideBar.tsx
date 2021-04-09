import Link from 'next/link';
import React from 'react';
import { postsDir, tagsDir } from '../utils/routes';

const TagSection = ({ tags }) => {
    const totalTags = tags.length;
    return (
        <>
            <hr />
            <div className={'py-4 lg:py-6'}>
                <h2 className={'uppercase font-bold text-xs tracking-wider'}>Tags</h2>
                {tags && 
                    <div className={'text-blog-primary-700 dark:text-blog-primary-200'}>
                        {tags.map((tag, index) => (
                            <React.Fragment key={tag}>
                                <Link
                                    href={`/${tagsDir}/[tag]`}
                                    as={`/${tagsDir}/${tag}`}
                                >
                                    <a className={`${index !== 0 && 'pl-2'} ${index !== totalTags - 1 && 'pr-2'} uppercase text-sm sidebar-link`}>
                                        {`${tag}`}
                                    </a> 
                                </Link>
                                {index != totalTags - 1 && '•'}
                            </React.Fragment>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

const OtherPostSection = ({ post, displayName }) => {
    return (   
        <div>
            <h2 className={'uppercase font-bold text-xs tracking-wider'}>{displayName} post{' '}</h2>
            <Link
                href={`/${postsDir}/[slug]`}
                as={`/${postsDir}/${post.slug}`}
            >
                <a className={'sidebar-link'}>
                    {post.data.title}
                </a>
            </Link>
        </div>
    )
}

const SideBar = ({ prev, curr, next }) => {
    return (
        <>
        <div className={'lg:sticky lg:top-12 py-8 flex flex-col text-blog-gray-600 dark:text-blog-gray-300'}>
            {curr.data.tags && <TagSection tags={curr.data.tags} />}
            {(prev || next) && 
                <>
                <hr />
                <div className={'justify-between py-4 lg:py-6 lg:space-y-6 flex lg:block'}>
                {prev && <OtherPostSection post={prev} displayName={'Previous'}/>}
                {next && <OtherPostSection post={next} displayName={'Next'}/>}
            </div>
            </>
            }
            <hr /> 
            <div className={'py-6'}>
                <Link href='/'>
                    <a className={'sidebar-link'}>
                        ← Back to the blog 
                    </a>
                </Link>
            </div>
        </div>
        </>
    );
}

export default SideBar;