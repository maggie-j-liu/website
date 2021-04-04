import React from 'react';
import Link from 'next/link';
import useActiveAnchor from '../hooks/useActiveAnchor';
import useLink from '../hooks/useLink';

const TableOfContents = ({ headings }) => {
    const anchors = React.useMemo(() => headings.map(heading => heading.anchor), [headings]);
    const activeAnchor = useActiveAnchor(anchors);
    const link = useLink();
    if (!link.query.slug) {
        return null;
    }
    const activeStyle = 'text-blog-gray-900 dark:text-blog-gray-100';
    const normalStyle = 'hover:text-blog-gray-900 dark:hover:text-blog-gray-100';
    return (
        <>
            <ul className={'sticky top-20 text-blog-gray-400 text-sm'}>
                <h1 className={'uppercase tracking-wider text-sm font-bold mb-2 text-blog-gray-500 dark:text-blog-gray-300'}>Table of Contents</h1>
                {headings.map(({ text, anchor }) => {
                    return (
                        <li key={anchor}>   
                            <Link href={{
                                ...link,
                                hash: anchor,
                            }}>
                                <a className={`${activeAnchor === anchor ? activeStyle : normalStyle} block py-1 transform transition-colors mr-8`}>
                                    {text}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default TableOfContents;