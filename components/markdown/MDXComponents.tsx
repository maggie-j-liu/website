import AnchorLink from "./AnchorLink";
import code from "./CodeBlock";
import CodeBlock from "./GithubCodeBlock";

const MDXComponents = {
  ...code,
  ...AnchorLink,
  CodeBlock,
  a: (props) => <a {...props} target="_blank" />,
};

export default MDXComponents;
