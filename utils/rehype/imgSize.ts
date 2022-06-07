// https://github.com/ksoichiro/rehype-img-size/blob/master/index.js
import visit from "unist-util-visit";
import imageSize from "image-size";
import ffprobe from "ffprobe";
import path from "path";
import os from "os";

// https://github.com/syntax-tree/unist-util-visit-parents/issues/8#issuecomment-619381050
const visitAsync = async (tree: any, matcher: any, asyncVisitor: Function) => {
  const matches: any[] = [];
  visit(tree, matcher, (...args) => {
    matches.push(args);
    return tree;
  });

  const promises = matches.map((match) => asyncVisitor(...match));
  await Promise.all(promises);

  return tree;
};

let dir: string;
const getImageSize = (src: string) => {
  src = path.join(dir, src);
  return imageSize(src);
};

const getVideoSize = async (src: string) => {
  src = path.join(dir, src);
  const info = await ffprobe(src, {
    path:
      os.platform() === "darwin" && os.arch() !== "x64"
        ? "/opt/homebrew/bin/ffprobe"
        : require("ffprobe-static").path,
  });
  return {
    width: info.streams[0].width,
    height: info.streams[0].height,
  };
};
const setImageSize = (options: { dir: string }) => {
  dir = options.dir;
  return transform;
};
const imports: { name: any; source: any }[] = [];
const transform = async (tree: any) => {
  visit(tree, "mdxjsEsm", onimport);
  await visitAsync(tree, "mdxJsxTextElement", onelement); // type from https://github.com/remcohaszing/remark-mdx-images/blob/main/src/index.ts
};

const onimport = (node: any) => {
  if (node.data?.estree?.body) {
    for (const item of node.data.estree.body) {
      let name = item.specifiers?.[0]?.local?.name;
      let source = item.source?.value;
      if (name && source) {
        imports.push({
          name,
          source,
        });
      }
    }
  }
};
const onelement = async (node: any) => {
  if (node.name === "img") {
    const srcAttribute = node.attributes.find(
      (attr: any) => attr.name === "src"
    );
    if (srcAttribute) {
      const name = srcAttribute.value.value;
      const imgImport = imports.find((i) => i.name === name);
      if (imgImport) {
        let dims;
        if (imgImport.source.endsWith(".mp4")) {
          node.name = "video";
          dims = await getVideoSize(imgImport.source);
        } else {
          dims = getImageSize(imgImport.source);
        }
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "width",
          value: dims.width,
        });
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "height",
          value: dims.height,
        });
      }
    }
  }
};

export default setImageSize;
