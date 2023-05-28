import AnchorLink from "./AnchorLink";
import pre from "./CodeBlock";
import CodeBlock from "./GithubCodeBlock";
import Image from "./Image";
import Video from "./Video";
import GitHub from "../GitHub";
import { FootnoteHover, FootNote } from "./Footnotes";

const MDXComponents = {
  pre,
  ...AnchorLink,
  a: (props: any) => {
    if (props["data-footnote-ref"] || props["data-footnote-backref"]) {
      return <a {...props} />;
    }
    return <a {...props} target="_blank" rel="noreferrer" />;
  },
  img: Image,
  video: Video,
  p: (props: any) => {
    if (
      typeof props.children !== "string" &&
      props.children !== undefined &&
      (props.children.type === "img" ||
        props.children.props?.src !== undefined ||
        props.children.type?.displayName === "MarkdownImage")
    ) {
      return <>{props.children}</>;
    }
    return <p {...props} />;
  },
  CodeBlock,
  Image,
  GitHub,
  fn: FootNote,
  fnHover: FootnoteHover,
};

export default MDXComponents;
