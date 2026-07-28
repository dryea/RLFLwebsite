"use client";

import { useEffect, useState } from "react";
import { Shield, Database } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { api } from "@/lib/api";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Record<string, string[]>;
  createdAt: string;
}

export default function CmsRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  async function loadRoles() {
    setLoading(true);
    try {
      const data = await api.getRoles();
      setRoles(data);
    } catch {
      setRoles([]);
    }
    setLoading(false);
  }

  async function handleSeed() {
    if (!confirm("This will create default roles (super-admin, admin, editor, author). Continue?")) return;
    setSeeding(true);
    try {
      await api.seedRoles();
      await loadRoles();
    } catch (e: any) {
      alert(e.message || "Failed to seed roles");
    }
    setSeeding(false);
  }

  const resourceLabels: Record<string, string> = {
    pages: "Pages", products: "Products", services: "Services",
    team: "Team", branches: "Branches", rates: "Rates",
    news: "News", events: "Events", notices: "Notices",
    reports: "Reports", gallery: "Gallery", downloads: "Downloads",
    faq: "FAQ", careers: "Careers", media: "Media",
    users: "Users", roles: "Roles", settings: "Settings",
  };

  const actionLabels: Record<string, string> = {
    create: "C", read: "R", update: "U", delete: "D", publish: "P", schedule: "S",
  };

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Roles & Permissions</h2>
        <button onClick={handleSeed} disabled={seeding} className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50">
          <Database className="h-4 w-4" /> Seed Default Roles
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-200" />)}
        </div>
      ) : roles.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center text-gray-500">
          <Shield className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium">No roles defined</p>
          <p className="mt-1 text-sm">Click "Seed Default Roles" to create the default role hierarchy.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {roles.map((role) => {
            const resourceKeys = Object.keys(role.permissions || {});
            return (
              <div key={role.id} className="rounded-lg border bg-white p-5">
                <div className="mb-3 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{role.name}</h3>
                    <p className="text-xs text-gray-500">{role.description}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b text-gray-500">
                        <th className="px-2 py-1 font-medium">Resource</th>
                        <th className="px-2 py-1 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resourceKeys.map((res) => (
                        <tr key={res} className="border-b border-gray-50">
                          <td className="px-2 py-1.5 font-medium text-gray-700">{resourceLabels[res] || res}</td>
                          <td className="px-2 py-1.5">
                            <div className="flex gap-1">
                              {(["create", "read", "update", "delete", "publish", "schedule"] as const).map((action) => (
                                <span key={action} className={`inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                                  role.permissions[res]?.includes(action)
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-400"
                                }`}>
                                  {actionLabels[action]}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </CMSLayout>
  );
}
