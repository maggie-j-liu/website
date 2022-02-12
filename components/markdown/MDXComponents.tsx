import AnchorLink from "./AnchorLink";
import pre from "./CodeBlock";
import CodeBlock from "./GithubCodeBlock";
import Image from "./Image";

const MDXComponents = {
  pre,
  ...AnchorLink,
  a: (props) => <a {...props} target="_blank" />,
  img: Image,
  p: (props) => {
    if (
      typeof props.children !== "string" &&
      (props.children.type === "img" || props.children.props?.src !== undefined)
    ) {
      return <>{props.children}</>;
    }
    return <p {...props} />;
  },
  CodeBlock,
  Image,
};

export default MDXComponents;
