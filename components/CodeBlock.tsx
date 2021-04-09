import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React from 'react';
import useColorMode from '../hooks/useColorMode';
import tailwindconfig from '../tailwind.config';
import colorModes from '../utils/colorModes';

type CodeBlockProps = {
    children: string;
    className?: string;
    linenums?: string;
    start?: string;
}

const CodeBlock = ({ children, className, linenums, start }: CodeBlockProps) => {
    const styles = tailwindconfig?.theme?.code;
    const lang = className?.replace('language-', '');
    let linenumbers, startingnumber;
    if (linenums === 'false') {
        linenumbers = false;
    }
    else if (linenums === 'true') {
        linenumbers = true;
    }
    if (linenums == undefined) {
        if (!className || lang === 'text') linenumbers = false;
        else linenumbers = true;
    }
    startingnumber = parseInt(start);
    if (isNaN(startingnumber)) {
        startingnumber = 1;
    }
    const Mode = useColorMode();
    return (
        <SyntaxHighlighter 
            language={lang}
            showLineNumbers={linenumbers}
            startingLineNumber={startingnumber}
            useInlineStyles={Mode !== undefined} 
            codeTagProps={{style: {}}}
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