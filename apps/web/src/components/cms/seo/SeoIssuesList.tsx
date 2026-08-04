"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export interface SeoIssue {
  code: string;
  severity: "error" | "warning" | "good";
  message: string;
  action?: string;
}

export default function SeoIssuesList({ issues }: { issues: SeoIssue[] }) {
  if (!issues || issues.length === 0) return null;

  const sorted = [...issues].sort((a, b) => {
    const order = { error: 0, warning: 1, good: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="space-y-2">
      {sorted.map((issue) => (
        <div
          key={`${issue.code}-${issue.message.slice(0, 40)}`}
          className={`flex items-start gap-2.5 rounded-lg border p-3 ${
            issue.severity === "error"
              ? "border-red-100 bg-red-50"
              : issue.severity === "warning"
              ? "border-amber-100 bg-amber-50"
              : "border-green-100 bg-green-50"
          }`}
        >
          {issue.severity === "error" ? (
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          ) : issue.severity === "warning" ? (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
          )}
          <div>
            <p className={`text-sm ${issue.severity === "good" ? "text-green-800" : issue.severity === "warning" ? "text-amber-800" : "text-red-800"}`}>
              {issue.message}
            </p>
            {issue.action && <p className="mt-0.5 text-xs text-gray-500">{issue.action}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
