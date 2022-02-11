// https://github.com/ksoichiro/rehype-img-size/blob/master/index.js
import visit from "unist-util-visit";
import imageSize from "image-size";
import path from "path";
let dir;
const getImageSize = (src) => {
  src = path.join(dir, src);
  return imageSize(src);
};
const setImageSize = (options) => {
  dir = options?.dir;
  return transform;
};
const imports = [];
const transform = (tree) => {
  visit(tree, "mdxjsEsm", onimport);
  visit(tree, "mdxJsxTextElement", onelement); // type from https://github.com/remcohaszing/remark-mdx-images/blob/main/src/index.ts
};
const onimport = (node) => {
  let name = node?.data?.estree?.body?.[0]?.specifiers?.[0]?.local?.name;
  let source = node.data.estree.body[0].source?.value;
  if (name && source) {
    imports.push({
      name,
      source,
    });
  }
};
const onelement = (node) => {
  if (node.name === "img") {
    const srcAttribute = node.attributes.find((attr) => attr.name === "src");
    if (srcAttribute) {
      const name = srcAttribute.value.value;
      const imgImport = imports.find((i) => i.name === name);
      if (imgImport) {
        const imageSize = getImageSize(imgImport.source);
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "width",
          value: imageSize.width,
        });
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "height",
          value: imageSize.height,
        });
      }
    }
  }
};

export default setImageSize;
