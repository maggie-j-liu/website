import Link from 'next/link';
import React from 'react';
import { tagsDir } from '../utils/routes';

const TagsLayout = ({ tags, divClassName, linkClassName }: { tags: string[], divClassName?: string, linkClassName?: string }) => {
    const totalTags = tags.length;
    return (
        <div className={divClassName}>
            {tags.map((tag, index) => (
                <React.Fragment key={tag}>
                    <Link href={`/${tagsDir}/${tag}`}>
                        <a className={`${index !== 0 && 'ml-2'} ${index !== totalTags - 1 && 'mr-2'} uppercase text-sm ${linkClassName}`}>
                            {tag}
                        </a>
                    </Link>
                    {index != totalTags - 1 && '•'}
                </React.Fragment>
            ))}
        </div>
    );
}

export default TagsLayout;