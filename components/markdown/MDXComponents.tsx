import AnchorLink from "./AnchorLink";
import code from "./CodeBlock";
import CodeBlock from "./GithubCodeBlock";
import Image from "./Image";

const MDXComponents = {
  ...code,
  ...AnchorLink,
  CodeBlock,
  a: (props) => <a {...props} target="_blank" />,
  img: Image,
};

export default MDXComponents;
