"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, Plus, ChevronRight, ChevronDown, GripVertical, Trash2, Edit3, Image as ImageIcon, ExternalLink, Save, X } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { getCmsUser, getCmsToken } from "@/lib/cms-auth";

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
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onAddChild,
}: {
  item: NavItem;
  depth: number;
  expanded: Set<number>;
  onToggle: (id: number) => void;
  onEdit: (item: NavItem) => void;
  onDelete: (id: number) => void;
  onAddChild: (parentId: number) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expanded.has(item.id);

  return (
    <>
      <div
        className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 shadow-sm transition-all hover:shadow-md`}
        style={{ marginLeft: `${depth * 24}px` }}
      >
        <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-gray-300" />
        {hasChildren ? (
          <button onClick={() => onToggle(item.id)} className="shrink-0 p-0.5 text-gray-400 hover:text-gray-700">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <div className="w-5" />
        )}
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.imageAlt || item.label} className="h-8 w-8 shrink-0 rounded object-cover" />
        )}
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium text-gray-900">{item.label}</span>
          {item.href && <span className="ml-2 text-xs text-gray-400">{item.href}</span>}
          {item.description && <p className="mt-0.5 truncate text-xs text-gray-500">{item.description}</p>}
        </div>
        <div className="flex items-center gap-1">
          {!item.isActive && <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-medium text-yellow-700">Hidden</span>}
          {item.isOpenInNewTab && <ExternalLink className="h-3.5 w-3.5 text-gray-400" />}
          <button onClick={() => onAddChild(item.id)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700" title="Add child">
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onEdit(item)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700" title="Edit">
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onDelete(item.id)} className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600" title="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <NavItemRow
              key={child.id}
              item={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </>
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
    parentId: item?.parentId || null as number | null,
    sortOrder: item?.sortOrder || 0,
    isOpenInNewTab: item?.isOpenInNewTab || false,
    isActive: item?.isActive !== false,
  });

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">{item?.id ? "Edit Item" : "Add Item"}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Label *</label>
          <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">URL</label>
          <input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} placeholder="/about" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Image URL</label>
          <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Image Alt Text</label>
          <input value={form.imageAlt} onChange={(e) => setForm({ ...form, imageAlt: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">Description (shown in mega menu)</label>
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Parent Item</label>
          <select value={form.parentId || ""} onChange={(e) => setForm({ ...form, parentId: e.target.value ? parseInt(e.target.value) : null })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500">
            <option value="">None (top level)</option>
            {parentOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{"".repeat(opt.depth)}{"└ "}{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Sort Order</label>
          <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={form.isOpenInNewTab} onChange={(e) => setForm({ ...form, isOpenInNewTab: e.target.checked })} className="rounded" />
          Open in new tab
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
          Active
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onSave(form)} disabled={!form.label} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 disabled:opacity-50">
          <Save className="h-3.5 w-3.5" /> Save
        </button>
        <button onClick={onCancel} className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
          <X className="h-3.5 w-3.5" /> Cancel
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

  const fetchMenus = useCallback(async () => {
    const res = await fetch(`${API}/api/cms/navigation`, { headers: authHeaders() });
    if (res.ok) setMenus(await res.json());
  }, []);

  const fetchItems = useCallback(async (menuId: number) => {
    const res = await fetch(`${API}/api/cms/navigation/${menuId}`, { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items || []);
      setExpanded(new Set(data.items?.filter((i: NavItem) => i.children?.length).map((i: NavItem) => i.id) || []));
    }
  }, []);

  useEffect(() => { fetchMenus(); }, [fetchMenus]);

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
      if (selectedMenu) fetchItems(selectedMenu.id);
    }
  }

  async function deleteItem(id: number) {
    if (!confirm("Delete this item and all children?")) return;
    const res = await fetch(`${API}/api/cms/nav-items/${id}`, { method: "DELETE", headers: authHeaders() });
    if (res.ok && selectedMenu) fetchItems(selectedMenu.id);
  }

  async function deleteMenu(id: number) {
    if (!confirm("Delete this menu and all items?")) return;
    const res = await fetch(`${API}/api/cms/navigation/${id}`, { method: "DELETE", headers: authHeaders() });
    if (res.ok) {
      setSelectedMenu(null);
      fetchMenus();
    }
  }

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Menu className="h-5 w-5" /> Navigation Manager
        </h1>
        <button onClick={() => setShowNewMenu(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800">
          <Plus className="h-4 w-4" /> New Menu
        </button>
      </div>

      {showNewMenu && (
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold">Create New Menu</h3>
          <div className="flex gap-3">
            <input value={newMenu.name} onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })} placeholder="Menu name" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            <input value={newMenu.slug} onChange={(e) => setNewMenu({ ...newMenu, slug: e.target.value })} placeholder="main-nav" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            <select value={newMenu.locale} onChange={(e) => setNewMenu({ ...newMenu, locale: e.target.value })} className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500">
              <option value="en">English</option>
              <option value="np">Nepali</option>
            </select>
            <button onClick={createMenu} className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800">Create</button>
            <button onClick={() => setShowNewMenu(false)} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">Menus</h2>
          {menus.map((menu) => (
            <div
              key={menu.id}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-all ${selectedMenu?.id === menu.id ? "border-primary-300 bg-primary-50 shadow-sm" : "bg-white hover:shadow-sm"}`}
            >
              <button onClick={() => setSelectedMenu(menu)} className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{menu.name}</p>
                <p className="text-xs text-gray-500">/{menu.slug} · {menu.locale}</p>
              </button>
              <button onClick={() => deleteMenu(menu.id)} className="rounded p-1 text-gray-400 hover:text-red-500">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {menus.length === 0 && <p className="text-sm text-gray-500">No menus yet. Create one to get started.</p>}
        </div>

        <div>
          {selectedMenu ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">{selectedMenu.name} Items</h2>
                <button onClick={() => setEditing({ navigationId: selectedMenu.id })} className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                  <Plus className="h-3 w-3" /> Add Item
                </button>
              </div>

              {editing && (
                <ItemForm
                  item={editing}
                  parentOptions={flattenItems(items)}
                  onSave={saveItem}
                  onCancel={() => setEditing(null)}
                />
              )}

              <div className="space-y-1.5">
                {items.map((item) => (
                  <NavItemRow
                    key={item.id}
                    item={item}
                    depth={0}
                    expanded={expanded}
                    onToggle={(id) => {
                      const next = new Set(expanded);
                      next.has(id) ? next.delete(id) : next.add(id);
                      setExpanded(next);
                    }}
                    onEdit={(item) => setEditing(item)}
                    onDelete={deleteItem}
                    onAddChild={(parentId) => setEditing({ navigationId: selectedMenu.id, parentId })}
                  />
                ))}
                {items.length === 0 && !editing && (
                  <div className="rounded-xl border-2 border-dashed p-12 text-center text-gray-500">
                    <Menu className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="text-sm">No items yet. Click "Add Item" to build your navigation.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed text-gray-400">
              <p className="text-sm">Select a menu to manage its items</p>
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
