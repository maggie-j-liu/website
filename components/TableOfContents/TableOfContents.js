import Link from 'next/link';
const TableOfContents = ({ headings, slug }) => {
    return (
        <>
            <ul className={'dark:text-gray-50'}>
                {headings.map(({text, anchor}) => (
                    <li key={anchor}>
                        <Link href={{
                            query: {
                                slug: slug,
                            },
                            hash: anchor,
                        }}>
                            <a>
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