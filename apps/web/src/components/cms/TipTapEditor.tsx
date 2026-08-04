"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { useCallback } from "react";
import { ProductGridExtension } from "./extensions/ProductGrid";
import { RateTableExtension } from "./extensions/RateTable";
import { ButtonExtension } from "./extensions/Button";
import { AccordionExtension } from "./extensions/Accordion";

const MenuButton = ({ onClick, active, children }: any) => (
  <button
    onClick={onClick}
    className={`rounded px-2 py-1 text-sm transition-colors ${active ? "bg-primary-100 text-primary-800" : "text-gray-600 hover:bg-gray-100"}`}
    type="button"
  >
    {children}
  </button>
);

export default function TipTapEditor({ content, onChange }: { content?: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: false,
        underline: false,
      }),
      Link.configure({ openOnClick: false }),
      ImageExt,
      Table.configure({ resizable: true }),
      TableRow, TableCell, TableHeader,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing..." }),
      Underline, Highlight,
      TaskList, TaskItem.configure({ nested: true }),
      ProductGridExtension, RateTableExtension, ButtonExtension, AccordionExtension,
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3" },
    },
  });

  const addImage = useCallback(() => {
    const url = prompt("Image URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addLink = useCallback(() => {
    const url = prompt("Link URL:");
    if (url && editor) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return <div className="min-h-[300px] animate-pulse rounded-lg bg-gray-100" />;

  return (
    <div className="rounded-lg border">
      <div className="flex flex-wrap items-center gap-0.5 border-b bg-gray-50 px-2 py-1.5">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          <strong>B</strong>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          <em>I</em>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}>
          <span className="underline">U</span>
        </MenuButton>
        <span className="mx-1 h-5 w-px bg-gray-300" />
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}>
          H1
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
          H2
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
          H3
        </MenuButton>
        <span className="mx-1 h-5 w-px bg-gray-300" />
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          • List
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          1. List
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")}>
          ☑ Task
        </MenuButton>
        <span className="mx-1 h-5 w-px bg-gray-300" />
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })}>
          ≡
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })}>
          ≡
        </MenuButton>
        <span className="mx-1 h-5 w-px bg-gray-300" />
        <MenuButton onClick={addLink} active={editor.isActive("link")}>
          🔗
        </MenuButton>
        <MenuButton onClick={addImage}>🖼</MenuButton>
        <MenuButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          📊
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
          ❝
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}>
          &lt;/&gt;
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          ↩
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          ↪
        </MenuButton>
      </div>
      <div className="flex flex-wrap gap-1 border-b px-3 py-1.5">
        <button onClick={() => editor.chain().focus().insertContent({ type: "productGrid", attrs: { type: "savings", limit: "6" } }).run()}
          className="rounded px-2 py-1 text-xs hover:bg-gray-100" title="Insert Product Grid" type="button">
          📦 Products
        </button>
        <button onClick={() => editor.chain().focus().insertContent({ type: "rateTable", attrs: { category: "savings" } }).run()}
          className="rounded px-2 py-1 text-xs hover:bg-gray-100" title="Insert Rate Table" type="button">
          📊 Rates
        </button>
        <button onClick={() => editor.chain().focus().insertContent({ type: "customButton", attrs: { text: "Learn More", url: "#" } }).run()}
          className="rounded px-2 py-1 text-xs hover:bg-gray-100" title="Insert Button" type="button">
          🔘 Button
        </button>
        <button onClick={() => editor.chain().focus().insertContent({ type: "accordion", attrs: { title: "Section Title" } }).run()}
          className="rounded px-2 py-1 text-xs hover:bg-gray-100" title="Insert Accordion" type="button">
          📑 Accordion
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
