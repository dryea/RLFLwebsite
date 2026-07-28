"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

interface Role {
  id: number;
  name: string;
}

export default function CmsUserEditorPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";
  const userId = isNew ? null : Number(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getRoles().then(setRoles).catch(() => {});
    if (userId) {
      api.getUser(userId).then((u: any) => {
        setName(u.name);
        setEmail(u.email);
        setRoleId(u.roleId);
        setIsActive(u.isActive);
        setLoading(false);
      }).catch(() => router.push("/cms/users"));
    }
  }, [userId, router]);

  async function handleSave() {
    if (!name || !email) return alert("Name and email are required");
    if (isNew && !password) return alert("Password is required");
    setSaving(true);
    const data: Record<string, any> = { name, email, roleId, isActive };
    if (password) data.password = password;
    try {
      if (userId) {
        await api.updateUser(userId, data);
      } else {
        const created = await api.createUser(data);
        router.replace(`/cms/users/${created.id}`);
      }
    } catch (e) {
      alert("Failed to save: " + e);
    }
    setSaving(false);
  }

  if (loading) return <CMSLayout><div className="h-96 animate-pulse rounded-lg bg-gray-200" /></CMSLayout>;

  return (
    <CMSLayout>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/cms/users" className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">{isNew ? "New User" : "Edit User"}</h2>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-50">
          <Save className="h-4 w-4" /> Save
        </button>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Account Details</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">{isNew ? "Password" : "New Password (leave blank to keep)"}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Role & Status</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Role</label>
              <select value={roleId ?? ""} onChange={(e) => setRoleId(e.target.value ? Number(e.target.value) : null)} className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500">
                <option value="">— No role —</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
