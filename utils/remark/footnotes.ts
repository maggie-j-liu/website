import visit from "unist-util-visit";

const footnotes = () => {
  return (tree: any, file: any) => {
    // get footnote definitions
    const footnoteDefs = new Map();
    visit(tree, "footnoteDefinition", (node: any) => {
      footnoteDefs.set(node.identifier, node.children);
    });

    visit(tree, "textDirective", (node: any) => {
      const data = node.data || (node.data = {});
      data.hName = node.name;
      data.hProperties = node.attributes;

      // footnotes
      if (node.name === "fn") {
        const identifier = node.attributes.id;
        if (!identifier) {
          file.fail("Must include the footnote identifier as the id.");
        }

        // get footnote definition
        const currentDef = footnoteDefs.get(identifier);

        // add hover element
        if (currentDef) {
          node.children.push({
            type: "element",
            name: "fnHover",
            children: currentDef,
            data: {
              hName: "fnHover",
              hProperties: {
                identifier,
              },
            },
          });
        }

        // add footnote reference element (will turn into superscript)
        node.children.push({
          type: "footnoteReference",
          identifier,
          label: identifier,
        });
      }
    });
  };
};

export default footnotes;
