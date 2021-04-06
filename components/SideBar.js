import Link from 'next/link';
import { postsDir } from '../utils/postsDir';
const SideBar = ({ prev, next }) => {
    return (
        <div className={'sticky top-12 flex flex-col'}>
            <div className={'justify-between py-8 space-y-8'}>
                {prev && <div className={'text-blog-gray-600 dark:text-blog-gray-300'}>
                    <h2 className={'uppercase font-bold text-xs tracking-wider'}>Previous post{' '}</h2>
                    <Link
                        href={`/${postsDir}/[slug]`}
                        as={`/${postsDir}/${prev.slug}`}
                    >
                        <a className={'text-blog-primary-500 hover:text-blog-primary-600 dark:text-blog-primary-300 dark:hover:text-blog-primary-200'}>
                            {prev.data.title}
                        </a>
                    </Link>
                </div>}
                {next && <div className={'text-blog-gray-600 dark:text-blog-gray-300'}>
                    <h2 className={'uppercase font-bold text-xs tracking-wider'}>Next post{' '}</h2>
                    <Link
                        href={`/${postsDir}/[slug]`}
                        as={`/${postsDir}/${next.slug}`}
                    >
                        <a className={'text-blog-primary-500 hover:text-blog-primary-600 dark:text-blog-primary-300 dark:hover:text-blog-primary-200'}>
                            {next.data.title}
                        </a>
                    </Link>
                </div>}
            </div>
              
            <hr /> 
            <div className={'py-8'}>
                <Link href='/'>
                    <a className={'text-blog-primary-500 hover:text-blog-primary-600 dark:text-blog-primary-300 dark:hover:text-blog-primary-200'}>
                        ← Back to the blog 
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default SideBar;