import AnchorLink from "./AnchorLink";
import pre from "./CodeBlock";
import CodeBlock from "./GithubCodeBlock";
import Image from "./Image";
import Video from "./Video";

const MDXComponents = {
  pre,
  ...AnchorLink,
  a: (props) => {
    if (props["data-footnote-ref"] || props["data-footnote-backref"]) {
      return <a {...props} />;
    }
    return <a {...props} target="_blank" rel="noreferrer" />;
  },
  img: Image,
  video: Video,
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
