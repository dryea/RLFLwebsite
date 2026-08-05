"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Menu,
  Plus,
  ChevronRight,
  ChevronDown,
  GripVertical,
  Trash2,
  Edit3,
  ExternalLink,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  CornerDownRight,
  CornerUpLeft,
  Check,
  FolderOpen,
  Folder,
  Eye,
  Layers,
  Sparkles,
} from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { getCmsToken } from "@/lib/cms-auth";

interface NavItem {
  id: number;
  navigationId: number;
  parentId: number | null;
  label: string;
  href: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  description: string | null;
  sortOrder: number;
  isOpenInNewTab: boolean;
  isActive: boolean;
  children?: NavItem[];
}

interface NavMenu {
  id: number;
  name: string;
  slug: string;
  locale: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

function authHeaders() {
  const token = getCmsToken();
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

function NavItemRow({
  item,
  depth,
  index,
  totalSiblings,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onAddChild,
  onMoveUp,
  onMoveDown,
  onIndent,
  onOutdent,
}: {
  item: NavItem;
  depth: number;
  index: number;
  totalSiblings: number;
  expanded: Set<number>;
  onToggle: (id: number) => void;
  onEdit: (item: NavItem) => void;
  onDelete: (id: number) => void;
  onAddChild: (parentId: number) => void;
  onMoveUp: (item: NavItem) => void;
  onMoveDown: (item: NavItem) => void;
  onIndent: (item: NavItem) => void;
  onOutdent: (item: NavItem) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expanded.has(item.id);

  return (
    <div className="space-y-1">
      <div
        className={`group flex items-center justify-between gap-3 rounded-2xl border bg-white p-3 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md ${
          !item.isActive ? "opacity-60 bg-gray-50/80" : ""
        }`}
        style={{ marginLeft: `${depth * 28}px` }}
      >
        {/* Left Side: Drag Grip, Expand Toggle, Label & Path */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-mono font-bold text-gray-500">
            #{item.sortOrder || index + 1}
          </span>

          {hasChildren ? (
            <button
              onClick={() => onToggle(item.id)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition-colors hover:bg-primary-100"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <span className="h-7 w-7 shrink-0 flex items-center justify-center text-gray-300">
              {depth > 0 ? <CornerDownRight className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />}
            </span>
          )}

          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.imageAlt || item.label} className="h-8 w-8 shrink-0 rounded-lg object-cover border" />
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900 truncate">{item.label}</span>
              {item.isOpenInNewTab && (
                <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
                  New Tab <ExternalLink className="h-2.5 w-2.5" />
                </span>
              )}
              {!item.isActive && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  Hidden
                </span>
              )}
            </div>
            {item.href && <p className="text-xs font-mono text-gray-400 truncate">{item.href}</p>}
          </div>
        </div>

        {/* Right Side: Reordering Arrows, Indent/Outdent & Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Quick Reorder Controls */}
          <div className="flex items-center gap-0.5 rounded-xl border border-gray-200 bg-gray-50/80 p-0.5">
            <button
              onClick={() => onMoveUp(item)}
              disabled={index === 0}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-white hover:text-primary-700 disabled:opacity-30"
              title="Move Up"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onMoveDown(item)}
              disabled={index === totalSiblings - 1}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-white hover:text-primary-700 disabled:opacity-30"
              title="Move Down"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
            {index > 0 && (
              <button
                onClick={() => onIndent(item)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-white hover:text-primary-700"
                title="Make Child of Item Above (Indent)"
              >
                <CornerDownRight className="h-3.5 w-3.5" />
              </button>
            )}
            {depth > 0 && (
              <button
                onClick={() => onOutdent(item)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-white hover:text-primary-700"
                title="Promote to Parent Level (Outdent)"
              >
                <CornerUpLeft className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Add Sub-Item */}
          <button
            onClick={() => onAddChild(item.id)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
            title="Add Sub-Item under this item"
          >
            <Plus className="h-4 w-4" />
          </button>

          {/* Edit Item */}
          <button
            onClick={() => onEdit(item)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
            title="Edit Item Details"
          >
            <Edit3 className="h-4 w-4" />
          </button>

          {/* Delete Item */}
          <button
            onClick={() => onDelete(item.id)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Delete Item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Render Child Sub-Items recursively */}
      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {item.children!.map((child, idx) => (
            <NavItemRow
              key={child.id}
              item={child}
              depth={depth + 1}
              index={idx}
              totalSiblings={item.children!.length}
              expanded={expanded}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onIndent={onIndent}
              onOutdent={onOutdent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ItemForm({
  item,
  parentOptions,
  onSave,
  onCancel,
}: {
  item: Partial<NavItem> | null;
  parentOptions: { id: number; label: string; depth: number }[];
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    label: item?.label || "",
    href: item?.href || "",
    imageUrl: item?.imageUrl || "",
    imageAlt: item?.imageAlt || "",
    description: item?.description || "",
    parentId: item?.parentId || (null as number | null),
    sortOrder: item?.sortOrder || 0,
    isOpenInNewTab: item?.isOpenInNewTab || false,
    isActive: item?.isActive !== false,
  });

  return (
    <div className="rounded-3xl border border-primary-100 bg-white p-6 shadow-xl ring-1 ring-black/5">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <h3 className="flex items-center gap-2 font-heading text-base font-bold text-gray-900">
          <Sparkles className="h-4 w-4 text-primary-600" />
          {item?.id ? "Edit Navigation Item" : "Create Navigation Item"}
        </h3>
        <button onClick={onCancel} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Item Label *</label>
          <input
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="e.g. Savings Accounts"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Destination URL Path</label>
          <input
            value={form.href || ""}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
            placeholder="e.g. /products/savings"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 font-mono"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Parent Menu Level</label>
          <select
            value={form.parentId || ""}
            onChange={(e) => setForm({ ...form, parentId: e.target.value ? parseInt(e.target.value) : null })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="">Top Level (Root Category)</option>
            {parentOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {"\u00A0\u00A0".repeat(opt.depth)}└ {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Display Sort Order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 font-mono"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Description (Shown inside MegaMenu card)</label>
          <input
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="e.g. High-yield savings accounts with daily interest calculation"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Thumbnail Image URL</label>
          <input
            value={form.imageUrl || ""}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 font-mono text-xs"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">Image Alt Tag</label>
          <input
            value={form.imageAlt || ""}
            onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
            placeholder="e.g. Savings account banner"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-6 border-t pt-4">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isOpenInNewTab}
            onChange={(e) => setForm({ ...form, isOpenInNewTab: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          Open in New Window / Tab
        </label>

        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          Visible / Active
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-3 border-t pt-4">
        <button
          onClick={onCancel}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={!form.label}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-800 disabled:opacity-50"
        >
          <Save className="h-4 w-4" /> Save Navigation Item
        </button>
      </div>
    </div>
  );
}

export default function CmsNavigationPage() {
  const [menus, setMenus] = useState<NavMenu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<NavMenu | null>(null);
  const [items, setItems] = useState<NavItem[]>([]);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [editing, setEditing] = useState<Partial<NavItem> | null>(null);
  const [newMenu, setNewMenu] = useState({ name: "", slug: "", locale: "en" });
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchMenus = useCallback(async () => {
    const res = await fetch(`${API}/api/cms/navigation`, { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json();
      setMenus(data);
      if (data.length > 0 && !selectedMenu) {
        setSelectedMenu(data[0]);
      }
    }
  }, [selectedMenu]);

  const fetchItems = useCallback(async (menuId: number) => {
    const res = await fetch(`${API}/api/cms/navigation/${menuId}`, { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items || []);
      setExpanded(new Set(data.items?.filter((i: NavItem) => i.children?.length).map((i: NavItem) => i.id) || []));
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  useEffect(() => {
    if (selectedMenu) fetchItems(selectedMenu.id);
  }, [selectedMenu, fetchItems]);

  function flattenItems(items: NavItem[], depth = 0): { id: number; label: string; depth: number }[] {
    const result: { id: number; label: string; depth: number }[] = [];
    for (const item of items) {
      if (item.id !== editing?.id) {
        result.push({ id: item.id, label: item.label, depth });
      }
      if (item.children) result.push(...flattenItems(item.children, depth + 1));
    }
    return result;
  }

  // Find siblings list of a target item
  function findSiblings(itemList: NavItem[], targetId: number): NavItem[] | null {
    if (itemList.some((i) => i.id === targetId)) return itemList;
    for (const item of itemList) {
      if (item.children) {
        const sub = findSiblings(item.children, targetId);
        if (sub) return sub;
      }
    }
    return null;
  }

  // Reorder items by swapping sortOrder
  async function handleMove(item: NavItem, direction: "up" | "down") {
    const siblings = findSiblings(items, item.id);
    if (!siblings) return;

    const idx = siblings.findIndex((i) => i.id === item.id);
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= siblings.length) return;

    const siblingItem = siblings[targetIdx];
    const newOrder1 = siblingItem.sortOrder || targetIdx + 1;
    const newOrder2 = item.sortOrder || idx + 1;

    // Send batch reorder to API
    const reorderPayload = [
      { id: item.id, sortOrder: newOrder1, parentId: item.parentId },
      { id: siblingItem.id, sortOrder: newOrder2, parentId: siblingItem.parentId },
    ];

    const res = await fetch(`${API}/api/cms/nav-items/reorder`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ items: reorderPayload }),
    });

    if (res.ok) {
      showToast(`Moved "${item.label}" ${direction}`);
      if (selectedMenu) fetchItems(selectedMenu.id);
    }
  }

  // Indent: Make child of sibling item directly above
  async function handleIndent(item: NavItem) {
    const siblings = findSiblings(items, item.id);
    if (!siblings) return;
    const idx = siblings.findIndex((i) => i.id === item.id);
    if (idx <= 0) return;

    const newParent = siblings[idx - 1];
    const res = await fetch(`${API}/api/cms/nav-items/${item.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ parentId: newParent.id, sortOrder: 99 }),
    });

    if (res.ok) {
      showToast(`Moved "${item.label}" under "${newParent.label}"`);
      if (selectedMenu) fetchItems(selectedMenu.id);
    }
  }

  // Outdent: Move up one parent level
  async function handleOutdent(item: NavItem) {
    if (!item.parentId) return;

    // Find parent object to get grandparent id
    const parentObj = flattenItems(items).find((i) => i.id === item.parentId);
    const grandParentId = parentObj ? null : null; // Outdent to top or grandparent

    const res = await fetch(`${API}/api/cms/nav-items/${item.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ parentId: grandParentId, sortOrder: 99 }),
    });

    if (res.ok) {
      showToast(`Promoted "${item.label}" to higher menu level`);
      if (selectedMenu) fetchItems(selectedMenu.id);
    }
  }

  async function createMenu() {
    if (!newMenu.name || !newMenu.slug) return;
    const res = await fetch(`${API}/api/cms/navigation`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(newMenu),
    });
    if (res.ok) {
      setNewMenu({ name: "", slug: "", locale: "en" });
      setShowNewMenu(false);
      showToast("Menu created successfully");
      fetchMenus();
    }
  }

  async function saveItem(data: any) {
    const url = editing?.id
      ? `${API}/api/cms/nav-items/${editing.id}`
      : `${API}/api/cms/nav-items`;
    const method = editing?.id ? "PUT" : "POST";
    const body = { ...data, navigationId: selectedMenu?.id };
    const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
    if (res.ok) {
      setEditing(null);
      showToast(editing?.id ? "Item updated" : "Item created");
      if (selectedMenu) fetchItems(selectedMenu.id);
    }
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this navigation item and all sub-items?")) return;
    const res = await fetch(`${API}/api/cms/nav-items/${id}`, { method: "DELETE", headers: authHeaders() });
    if (res.ok) {
      showToast("Item deleted");
      if (selectedMenu) fetchItems(selectedMenu.id);
    }
  }

  async function deleteMenu(id: number) {
    if (!confirm("Delete this entire menu structure?")) return;
    const res = await fetch(`${API}/api/cms/navigation/${id}`, { method: "DELETE", headers: authHeaders() });
    if (res.ok) {
      setSelectedMenu(null);
      showToast("Menu deleted");
      fetchMenus();
    }
  }

  const expandAll = () => {
    const allIds = new Set<number>();
    const collect = (list: NavItem[]) => {
      list.forEach((i) => {
        allIds.add(i.id);
        if (i.children) collect(i.children);
      });
    };
    collect(items);
    setExpanded(allIds);
  };

  const collapseAll = () => setExpanded(new Set());

  return (
    <CMSLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-2xl animate-fade-up">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-extrabold text-gray-900">
            <Menu className="h-6 w-6 text-primary-700" /> Navigation Hierarchy Manager
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Easily reorder, nest, edit, or create navigation links for main site & mobile menus.
          </p>
        </div>

        <button
          onClick={() => setShowNewMenu(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-primary-800"
        >
          <Plus className="h-4 w-4" /> Create New Menu
        </button>
      </div>

      {/* Create Menu Modal / Form */}
      {showNewMenu && (
        <div className="mb-6 rounded-2xl border border-primary-100 bg-white p-5 shadow-lg">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-800">Create New Navigation Structure</h3>
          <div className="flex flex-wrap gap-3">
            <input
              value={newMenu.name}
              onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
              placeholder="Menu Name (e.g. Header Main Nav)"
              className="rounded-xl border px-4 py-2 text-xs outline-none focus:border-primary-500"
            />
            <input
              value={newMenu.slug}
              onChange={(e) => setNewMenu({ ...newMenu, slug: e.target.value })}
              placeholder="Slug (e.g. main-nav)"
              className="rounded-xl border px-4 py-2 text-xs outline-none focus:border-primary-500 font-mono"
            />
            <select
              value={newMenu.locale}
              onChange={(e) => setNewMenu({ ...newMenu, locale: e.target.value })}
              className="rounded-xl border px-4 py-2 text-xs outline-none focus:border-primary-500"
            >
              <option value="en">English (en)</option>
              <option value="np">Nepali (np)</option>
            </select>
            <button onClick={createMenu} className="rounded-xl bg-primary-700 px-5 py-2 text-xs font-bold text-white hover:bg-primary-800">
              Create Menu
            </button>
            <button onClick={() => setShowNewMenu(false)} className="rounded-xl border px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Menu Selector & Reorder Workspace */}
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Left Column: Menu Selector Cards */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Navigation Menus</h2>
          <div className="space-y-2">
            {menus.map((menu) => {
              const isSelected = selectedMenu?.id === menu.id;
              return (
                <div
                  key={menu.id}
                  className={`group flex items-center justify-between rounded-2xl border p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary-500 bg-primary-50 shadow-md ring-1 ring-primary-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedMenu(menu)}
                >
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-extrabold ${isSelected ? "text-primary-800" : "text-gray-900"}`}>{menu.name}</p>
                    <p className="text-[11px] font-mono text-gray-400">/{menu.slug} · {menu.locale.toUpperCase()}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMenu(menu.id);
                    }}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete Menu"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Reorder & Edit Tree */}
        <div>
          {selectedMenu ? (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-bold text-gray-900">{selectedMenu.name} Items</h2>
                  <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-mono font-bold text-primary-800">
                    {items.length} items
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={expandAll}
                    className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <FolderOpen className="h-3.5 w-3.5" /> Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <Folder className="h-3.5 w-3.5" /> Collapse All
                  </button>
                  <button
                    onClick={() => setEditing({ navigationId: selectedMenu.id })}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary-700 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-primary-800"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Top Item
                  </button>
                </div>
              </div>

              {/* Edit Drawer Form */}
              {editing && (
                <ItemForm
                  item={editing}
                  parentOptions={flattenItems(items)}
                  onSave={saveItem}
                  onCancel={() => setEditing(null)}
                />
              )}

              {/* Items Tree Rows */}
              <div className="space-y-1.5">
                {items.map((item, idx) => (
                  <NavItemRow
                    key={item.id}
                    item={item}
                    depth={0}
                    index={idx}
                    totalSiblings={items.length}
                    expanded={expanded}
                    onToggle={(id) => {
                      const next = new Set(expanded);
                      next.has(id) ? next.delete(id) : next.add(id);
                      setExpanded(next);
                    }}
                    onEdit={(item) => setEditing(item)}
                    onDelete={deleteItem}
                    onAddChild={(parentId) => setEditing({ navigationId: selectedMenu.id, parentId })}
                    onMoveUp={(item) => handleMove(item, "up")}
                    onMoveDown={(item) => handleMove(item, "down")}
                    onIndent={handleIndent}
                    onOutdent={handleOutdent}
                  />
                ))}

                {items.length === 0 && !editing && (
                  <div className="rounded-3xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-400">
                    <Menu className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="text-sm font-semibold">No menu items found. Click "Add Top Item" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 text-gray-400">
              <p className="text-sm font-semibold">Select a menu on the left to manage its structure</p>
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
