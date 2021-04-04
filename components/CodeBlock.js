import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
const CodeBlock = ({ children, className, linenums, start }) => {
    const lang = className?.replace('language-', '');
    if (linenums == undefined) {
        if (!className || lang === 'text') linenums = false;
        else linenums = true;
    }
    start = parseInt(start);
    if (isNaN(start)) {
        start = 1;
    }
    return (
        <SyntaxHighlighter 
            language={lang}
            showLineNumbers={linenums}
            startingLineNumber={start}
            useInlineStyles={false} 
            codeTagProps={{style: {}}} 
            lineNumberStyle={{color: '#999'}}
            className={className || 'language-text'}
        >
            {children.trim()}
        </SyntaxHighlighter>
    );
}

export default {
    pre: (props) => <div {...props} />,
    code: CodeBlock
}