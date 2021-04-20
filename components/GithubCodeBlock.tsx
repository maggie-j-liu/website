
import { CodeBlock } from './CodeBlock';
const GithubCodeBlock = ({ children, language, link }) => {
    const cleanedLink = link.replace('https://github.com/', '').replace(/\/blob\/[^\/]*/, '');
    return (
        <>
            {link && 
                <div className={'bg-blog-contrast-50 dark:bg-blog-gray-700 rounded-t-md'}>
                    <a 
                        href={link}
                        className={'!font-medium !text-blog-contrast-700 dark:!text-blog-contrast-200 ml-4 my-2 inline-block'}
                        target='_blank'
                    >
                        {cleanedLink}
                    </a>
                </div>
            }
            <CodeBlock children={children} className={language} style={{marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0}} />
        </>
    )
}

export default GithubCodeBlock;