import visit from "unist-util-visit";

const directives = () => {
  return (tree, file) => {
    const footnotes = [];
    visit(
      tree,
      ["textDirective", "leafDirective", "containerDirective"],
      (node: any) => {
        const data = node.data || (node.data = {});
        data.hName = node.name;
        data.hProperties = node.attributes;

        // footnotes
        if (node.type === "textDirective" && node.name === "fn") {
          const identifier = node.attributes.id;
          if (!identifier) {
            file.fail("Must include the footnote identifier as the id.");
          }
          node.children.push({
            type: "footnoteReference",
            identifier,
            label: identifier,
          });
        }
      }
    );
  };
};

export default directives;
