import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
const CodeBlock = ({ children, className }) => {
    const lang = className?.replace('language-', '');
    let theme = prism;
    if (typeof document !== 'undefined' && document?.documentElement?.classList.contains('dark')) theme = dark;
    let linenums = true;
    if (!className || lang == 'text') linenums = false;
    return (
        <SyntaxHighlighter 
            language={lang} 
            style={theme} 
            showLineNumbers={linenums} 
            useInlineStyles={false} 
            codeTagProps={{style: {}}} 
            PreTag={PreWithLang}
            lineNumberStyle={{color: '#999'}}
        >
            {children.trim()}
        </SyntaxHighlighter>
    );
}

const PreWithLang = ({ children, language }) => {
    return (
        <pre className={`language-${language}`}>
            {children}
        </pre>
    );
}

export default {
    pre: (props) => <div {...props} />,
    code: CodeBlock
}