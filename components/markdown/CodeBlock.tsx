import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import React from "react";
const {
  prism,
  dracula,
} = require("react-syntax-highlighter/dist/cjs/styles/prism");

type CodeBlockProps = {
  children: string;
  className?: string;
  linenums?: string;
  start?: string;
  style?: object;
};

const theme = {
  light: prism,
  dark: dracula,
};

export const CodeBlock = ({
  children,
  className,
  linenums,
  start,
  style,
}: CodeBlockProps) => {
  const lang = className?.replace("language-", "");
  let linenumbers, startingnumber;
  if (linenums === "false") {
    linenumbers = false;
  } else if (linenums === "true") {
    linenumbers = true;
  }
  if (linenums == undefined) {
    if (!className || lang === "text") linenumbers = false;
    else linenumbers = true;
  }
  startingnumber = parseInt(start);
  if (isNaN(startingnumber)) {
    startingnumber = 1;
  }
  return (
    <>
      <SyntaxHighlighter
        language={lang}
        showLineNumbers={linenumbers}
        startingLineNumber={startingnumber}
        codeTagProps={{ style: {} }}
        style={theme.dark}
        customStyle={{ fontSize: "inherit", ...style }}
        className={"hidden dark:block"}
      >
        {children.trim()}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language={lang}
        showLineNumbers={linenumbers}
        startingLineNumber={startingnumber}
        codeTagProps={{ style: {} }}
        style={theme.light}
        customStyle={{ fontSize: "inherit", ...style }}
        className={"block dark:hidden"}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </>
  );
};

export default {
  pre: (props) => <div {...props} />,
  code: CodeBlock,
};
