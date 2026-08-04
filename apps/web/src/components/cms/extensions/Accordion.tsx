import { Node } from "@tiptap/core";

export const AccordionExtension = Node.create({
  name: "accordion",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      title: { default: "Section Title" },
      open: { default: false },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='accordion']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { "data-type": "accordion", class: "accordion-embed", ...HTMLAttributes },
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement("div");
      wrapper.className = "rounded-lg border border-dashed border-amber-300 bg-amber-50 p-4 text-center";
      wrapper.innerHTML = `
        <div class="text-sm font-semibold text-amber-700">📑 Accordion</div>
        <div class="text-xs text-gray-500">Title: ${node.attrs.title}</div>
      `;
      return { dom: wrapper };
    };
  },
});
