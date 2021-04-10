import { getAllTags } from '../../lib/getTags';
import { GetStaticProps } from 'next';
import PageLayout from '../../layouts/PageLayout';
import React from 'react';
import Link from 'next/link';
import { tagsDir } from '../../utils/routes';

const TagIndex = ({ tags }) => {
    let countedTags: { [tag: string]: number } = {};
    tags.forEach(tag => {
        if (tag in countedTags) {
            countedTags[tag]++;
        }
        else {
            countedTags[tag] = 1;
        }
    })
    return (
        <PageLayout page={'blog'} full={true}>
            <div className={'flex flex-col justify-center'}>
            <div className={'flex flex-col md:flex-row md:justify-center md:items-center md:space-x-8'}>
                <h1 className={'text-5xl font-bold text-blog-gray-900 dark:text-blog-gray-200 md:pr-6 md:border-r-2'}>Tags</h1>
                <div className={'text-blog-gray-700 dark:text-blog-gray-400 flex flex-wrap max-w-xl'}>
                    {Object.entries(countedTags).map(([tag, count]) => (
                        <div key={tag} className={'py-1 pr-4 text-base uppercase'}>
                            <Link href={`/${tagsDir}/${tag}`}>
                                <a className={'pr-1 postlist-tag-link'}>{tag}</a>
                            </Link>
                            <span className={'font-semibold'}>{' ('}{count}{')'}</span>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </PageLayout>
    )
}

export default TagIndex;

export const getStaticProps: GetStaticProps = async () => {
    const tags = getAllTags();
    return {
        props: {
            tags
        }
    }
}