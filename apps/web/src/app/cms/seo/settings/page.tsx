"use client";

import { useEffect, useState } from "react";
import { Save, Check } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { API } from "@/lib/api";
import { getCmsToken } from "@/lib/cms-auth";

const DEFAULT_SETTINGS: Record<string, any> = {
  siteTitle: "Reliance Finance Limited",
  tagline: "Your trusted financial partner in Nepal",
  siteUrl: "https://reliancenepal.com.np",
  defaultTitleTemplate: "%s | Reliance Finance Limited",
  defaultDescription: "",
  robotsIndex: true,
  robotsFollow: true,
  sitemapEnabled: true,
  sitemapIncludeProducts: true,
  sitemapIncludeServices: true,
  sitemapIncludeNews: true,
  schemaOrgType: "Organization",
  schemaOrgName: "Reliance Finance Limited",
  schemaOrgLogo: "https://reliancenepal.com.np/logo.png",
  schemaOrgAddress: "Reliance Bhawan, Kamaladi, Kathmandu, Nepal",
  schemaOrgPhone: "+977-01-5361104",
  schemaOrgEmail: "info@reliancenepal.com.np",
  socialFacebook: "https://www.facebook.com/reliancenepal/",
  socialTwitter: "https://twitter.com/reliancenepal",
  socialLinkedIn: "https://np.linkedin.com/company/reliancenepal",
  socialInstagram: "https://www.instagram.com/reliancenepal/",
  socialYouTube: "https://www.youtube.com/@reliancenepal",
  ogImage: "",
  twitterCardType: "summary_large_image",
};

const FIELDS: { key: string; label: string; type: string; group: string; help?: string }[] = [
  { key: "siteTitle", label: "Site Title", type: "text", group: "General" },
  { key: "tagline", label: "Tagline", type: "text", group: "General", help: "Shown in browser title and default meta description" },
  { key: "siteUrl", label: "Site URL", type: "text", group: "General" },
  { key: "defaultTitleTemplate", label: "Title Template", type: "text", group: "General", help: "%s is replaced with the page title" },
  { key: "defaultDescription", label: "Default Description", type: "textarea", group: "General" },
  { key: "robotsIndex", label: "Index Site", type: "checkbox", group: "Robots", help: "Allow search engines to index the site" },
  { key: "robotsFollow", label: "Follow Links", type: "checkbox", group: "Robots" },
  { key: "sitemapEnabled", label: "Enable Sitemap", type: "checkbox", group: "Sitemap" },
  { key: "sitemapIncludeProducts", label: "Include Products", type: "checkbox", group: "Sitemap" },
  { key: "sitemapIncludeServices", label: "Include Services", type: "checkbox", group: "Sitemap" },
  { key: "sitemapIncludeNews", label: "Include News", type: "checkbox", group: "Sitemap" },
  { key: "schemaOrgType", label: "Organization Type", type: "text", group: "Schema.org" },
  { key: "schemaOrgName", label: "Organization Name", type: "text", group: "Schema.org" },
  { key: "schemaOrgLogo", label: "Organization Logo URL", type: "text", group: "Schema.org" },
  { key: "schemaOrgAddress", label: "Address", type: "text", group: "Schema.org" },
  { key: "schemaOrgPhone", label: "Phone", type: "text", group: "Schema.org" },
  { key: "schemaOrgEmail", label: "Email", type: "text", group: "Schema.org" },
  { key: "socialFacebook", label: "Facebook", type: "text", group: "Social Profiles" },
  { key: "socialTwitter", label: "Twitter / X", type: "text", group: "Social Profiles" },
  { key: "socialLinkedIn", label: "LinkedIn", type: "text", group: "Social Profiles" },
  { key: "socialInstagram", label: "Instagram", type: "text", group: "Social Profiles" },
  { key: "socialYouTube", label: "YouTube", type: "text", group: "Social Profiles" },
  { key: "ogImage", label: "Default Open Graph Image URL", type: "text", group: "Social" },
  { key: "twitterCardType", label: "Twitter Card Type", type: "text", group: "Social", help: "summary or summary_large_image" },
];

export default function CmsSeoSettingsPage() {
  const [values, setValues] = useState<Record<string, any>>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/cms/seo/settings`, { headers: { Authorization: `Bearer ${getCmsToken()}` } })
      .then((r) => r.json())
      .then((data) => {
        setValues({ ...DEFAULT_SETTINGS, ...data });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function save() {
    setSaved(false);
    const res = await fetch(`${API}/api/cms/seo/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCmsToken()}` },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  const groups = ["General", "Robots", "Sitemap", "Schema.org", "Social Profiles", "Social"];

  return (
    <CMSLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">SEO Settings</h1>
        <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />} {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>

      {loading ? (
        <div className="h-96 animate-pulse rounded-lg bg-gray-200" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group} className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="mb-4 border-b pb-2 text-sm font-semibold text-gray-700">{group}</h2>
              <div className="space-y-3">
                {FIELDS.filter((f) => f.group === group).map((field) => (
                  <div key={field.key}>
                    <label className="mb-1 block text-xs font-medium text-gray-600">{field.label}</label>
                    {field.type === "checkbox" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!values[field.key]}
                          onChange={(e) => setValues({ ...values, [field.key]: e.target.checked })}
                          className="h-4 w-4 rounded"
                        />
                        <span className="text-xs text-gray-500">Enabled</span>
                      </div>
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={values[field.key] || ""}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        rows={2}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={values[field.key] || ""}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500"
                      />
                    )}
                    {field.help && <p className="mt-0.5 text-[10px] text-gray-400">{field.help}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </CMSLayout>
  );
}
