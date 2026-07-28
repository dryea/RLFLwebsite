import { Node } from "@tiptap/core";

export const ProductGridExtension = Node.create({
  name: "productGrid",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      type: { default: "savings" },
      limit: { default: "6" },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='product-grid']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { "data-type": "product-grid", class: "product-grid-embed", ...HTMLAttributes },
      0,
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement("div");
      wrapper.className = "rounded-lg border border-dashed border-primary-300 bg-primary-50 p-4 text-center";
      wrapper.innerHTML = `
        <div class="text-sm font-semibold text-primary-700">📦 Product Grid</div>
        <div class="text-xs text-gray-500">Type: ${node.attrs.type} | Limit: ${node.attrs.limit}</div>
      `;
      return { dom: wrapper };
    };
  },
});
