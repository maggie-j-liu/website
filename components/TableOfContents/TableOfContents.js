import React from 'react';
import Link from 'next/link';
import useActiveAnchor from './useActiveAnchor';

const TableOfContents = ({ headings, slug }) => {
    const anchors = React.useMemo(() => headings.map(heading => heading.anchor), [headings]);
    const activeAnchor = useActiveAnchor(anchors, '0px 0px 0px 0px');
    const activeStyle = 'text-blog-contrast-500 dark:text-blog-contrast-300 underline';
    const normalStyle = 'hover:text-blog-contrast-500 dark:hover:text-blog-contrast-300 hover:underline'
    return (
        <>
            <ul className={'fixed dark:text-gray-50'}>
                {headings.map(({text, anchor}) => (
                    <li key={anchor}>
                        <Link href={{
                            pathname:'/posts/[slug]',
                            query: {
                                slug: slug,
                            },
                            hash: anchor,
                        }}>
                            <a className={`text-blog-secondary-600 dark:text-blog-secondary-400 ${activeAnchor === anchor ? activeStyle : normalStyle}`}>
                                {text}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TableOfContents;