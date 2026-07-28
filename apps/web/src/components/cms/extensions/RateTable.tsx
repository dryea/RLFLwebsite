import { Node } from "@tiptap/core";

export const RateTableExtension = Node.create({
  name: "rateTable",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      category: { default: "savings" },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='rate-table']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { "data-type": "rate-table", class: "rate-table-embed", ...HTMLAttributes },
      0,
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement("div");
      wrapper.className = "rounded-lg border border-dashed border-green-300 bg-green-50 p-4 text-center";
      wrapper.innerHTML = `
        <div class="text-sm font-semibold text-green-700">📊 Rate Table</div>
        <div class="text-xs text-gray-500">Category: ${node.attrs.category}</div>
      `;
      return { dom: wrapper };
    };
  },
});
