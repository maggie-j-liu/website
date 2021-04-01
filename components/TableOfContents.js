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
    const activeStyle = 'text-blog-contrast-500 dark:text-blog-contrast-300 underline';
    const normalStyle = 'hover:text-blog-contrast-500 dark:hover:text-blog-contrast-300 hover:underline'
    return (
        <>
            <ul className={'fixed text-blog-gray-500 dark:text-blog-gray-400'}>
                {headings.map(({text, anchor}) => (
                    <li key={anchor}>
                        <Link href={{
                            ...link,
                            hash: anchor,
                        }}>
                            <a className={`${activeAnchor === anchor ? activeStyle : normalStyle}`}>
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