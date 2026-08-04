// Nepali (Bikram Sambat) date utilities
// Training dates are already in BS (e.g. "2082-04-10"). This formats them.

const MONTHS_NP = [
  "बैशाख", "जेठ", "असार", "श्रावण", "भदौ", "आश्विन",
  "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत",
];

const DIGITS_NP = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => DIGITS_NP[Number(d)]);
}

// Input: "2082-04-10" or "2082/04/10" or "2082-04-16-17" (multi-day) -> formatted Nepali
export function formatBsDate(dateStr: string, lang: string = "en"): string {
  if (!dateStr) return "";
  const m = dateStr.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[-/](\d{1,2}))?$/);
  if (!m) return dateStr;
  const [, year, month, day, endDay] = m;
  const monthIdx = parseInt(month) - 1;
  const monthName = MONTHS_NP[monthIdx] || month;

  if (lang === "np") {
    const base = `${toNepaliDigits(day)} ${monthName} ${toNepaliDigits(year)}`;
    return endDay ? `${base} – ${toNepaliDigits(endDay)}` : base;
  }
  // English transliteration
  const enMonths = [
    "Baishakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
  ];
  const base = `${parseInt(day)} ${enMonths[monthIdx]} ${year}`;
  return endDay ? `${base} – ${parseInt(endDay)}` : base;
}

export function formatBsDateShort(dateStr: string): string {
  const m = dateStr.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (!m) return dateStr;
  const [, year, month, day] = m;
  return `${toNepaliDigits(day)} ${MONTHS_NP[parseInt(month) - 1] || month} ${toNepaliDigits(year)}`;
}
