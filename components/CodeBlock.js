import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React from 'react';
import useColorMode from '../hooks/useColorMode';
import tailwindconfig from '../tailwind.config';
import colorModes from '../utils/colorModes';
const CodeBlock = ({ children, className, linenums, start }) => {
    const styles = tailwindconfig?.theme?.code;
    const lang = className?.replace('language-', '');
    if (linenums == undefined) {
        if (!className || lang === 'text') linenums = false;
        else linenums = true;
    }
    start = parseInt(start);
    if (isNaN(start)) {
        start = 1;
    }
    const Mode = useColorMode();
    return (
        <SyntaxHighlighter 
            language={lang}
            showLineNumbers={linenums}
            startingLineNumber={start}
            useInlineStyles={Mode !== undefined} 
            codeTagProps={{style: {}}}
            className={className || 'language-text'}
            style={Mode?.colorMode === colorModes.dark ? styles?.dark : styles?.light}
            customStyle={{fontSize:'inherit'}}
            className={Mode !== undefined && 'filter blur-0'}
        >
            {children.trim()}
        </SyntaxHighlighter>
    );
}

export default {
    pre: (props) => <div {...props} />,
    code: CodeBlock
}