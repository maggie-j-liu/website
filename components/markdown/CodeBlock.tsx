import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import React from "react";
import { prism, dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import useColorMode from "@/hooks/useColorMode";
import colorModes from "@/utils/colorModes";
SyntaxHighlighter.registerLanguage("cpp", cpp);
type CodeBlockProps = {
  children: string;
  className?: string;
  linenums?: string;
  start?: string;
  style?: object;
  header?: boolean;
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
  header = true,
}: CodeBlockProps) => {
  const isDarkMode = useColorMode().colorMode === colorModes.dark;
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
  if (!start) {
    startingnumber = 1;
  } else {
    startingnumber = parseInt(start);
    if (isNaN(startingnumber)) {
      startingnumber = 1;
    }
  }
  return (
    <>
      {header && lang && (
        <CodeBlockHeader>
          <span className="text-contrast-900 dark:text-contrast-200">
            Language: {lang}
          </span>
        </CodeBlockHeader>
      )}
      <SyntaxHighlighter
        language={lang}
        showLineNumbers={linenumbers}
        startingLineNumber={startingnumber}
        codeTagProps={{ style: {} }}
        style={theme.dark}
        customStyle={{
          fontSize: "inherit",
          ...style,
          ...(header
            ? { marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }
            : {}),
        }}
        className={"hidden dark:block"}
        aria-hidden={isDarkMode ? "false" : "true"}
      >
        {children.trim()}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language={lang}
        showLineNumbers={linenumbers}
        startingLineNumber={startingnumber}
        codeTagProps={{ style: {} }}
        style={theme.light}
        customStyle={{
          fontSize: "inherit",
          ...style,
          ...(header
            ? { marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }
            : {}),
        }}
        className={"block dark:hidden"}
        aria-hidden={isDarkMode ? "true" : "false"}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </>
  );
};

const pre = (props: any) => {
  if (props.children?.type === "code") {
    return <CodeBlock {...props.children.props} />;
  }
  return <pre {...props} />;
};
export default pre;

export const CodeBlockHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        "overflow-x-auto rounded-t-md bg-contrast-50 px-4 py-2 dark:bg-dark-700"
      }
    >
      {children}
    </div>
  );
};
