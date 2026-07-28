"use client";

interface LangTab {
  code: string;
  label: string;
  native: string;
}

const languages: LangTab[] = [
  { code: "en", label: "English", native: "English" },
  { code: "np", label: "Nepali", native: "नेपाली" },
];

interface LanguageTabsProps {
  active: string;
  onChange: (code: string) => void;
}

export default function LanguageTabs({ active, onChange }: LanguageTabsProps) {
  return (
    <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            active === lang.code
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="text-xs uppercase text-gray-400">{lang.code}</span>
          {lang.native}
        </button>
      ))}
    </div>
  );
}
