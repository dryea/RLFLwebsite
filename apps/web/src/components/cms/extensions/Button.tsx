import { Node } from "@tiptap/core";

export const ButtonExtension = Node.create({
  name: "customButton",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      text: { default: "Click Here" },
      url: { default: "" },
      variant: { default: "primary" },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='custom-button']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "custom-button", ...HTMLAttributes }];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement("div");
      wrapper.className = "rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-center";
      wrapper.innerHTML = `<span class="inline-block rounded-lg bg-primary-700 px-6 py-2 text-sm font-medium text-white">${node.attrs.text}</span>
        <div class="mt-1 text-xs text-gray-400">→ ${node.attrs.url}</div>`;
      return { dom: wrapper };
    };
  },
});
