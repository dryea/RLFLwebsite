import { Smartphone, Download } from "lucide-react";

interface AppBannerData {
  title?: string;
  titleNp?: string;
  description?: string;
  descriptionNp?: string;
  androidUrl?: string;
  iosUrl?: string;
}

export default function AppBanner({ data, lang }: { data: AppBannerData | null; lang: string }) {
  const d = data || {};
  const title = d.title || "Go Digital with Reliance Finance";
  const titleNp = d.titleNp || "रिलायन्स फाइनान्ससँग डिजिटल बन्नुहोस्";
  const description = d.description || "Experience the convenience of digital banking right at your fingertips. Download the Reliance Finance Smart App today.";
  const descriptionNp = d.descriptionNp || "डिजिटल बैंकिङको सुविधा तपाईंको औंलामा। आजै रिलायन्स फाइनान्स स्मार्ट एप डाउनलोड गर्नुहोस्।";
  const androidUrl = d.androidUrl || "https://play.google.com/store/apps/details?id=com.f1soft.reliancefinance";
  const iosUrl = d.iosUrl || "https://apps.apple.com/np/app/reliance-finance-smart/id1554035637";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 px-8 py-12 text-white shadow-xl">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="max-w-xl text-center md:text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Smartphone className="h-4 w-4" />
            {lang === "en" ? "Mobile App" : "मोबाइल एप"}
          </div>
          <h3 className="mb-3 text-3xl font-extrabold md:text-4xl">
            {lang === "np" ? titleNp : title}
          </h3>
          <p className="mb-6 text-primary-100">
            {lang === "np" ? descriptionNp : description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-black/30 px-6 py-3 text-white backdrop-blur transition-all hover:bg-black/40 hover:-translate-y-0.5"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 12.59c.034-3.076 2.694-4.544 2.82-4.614-1.54-2.252-3.926-2.56-4.777-2.594-2.034-.206-3.973 1.196-5.007 1.196-1.04 0-2.645-1.17-4.35-1.138-2.236.034-4.302 1.3-5.456 3.304-2.343 4.063-.603 10.082 1.677 13.378 1.115 1.613 2.44 3.423 4.187 3.357 1.68-.068 2.313-1.09 4.347-1.09 2.023 0 2.61 1.09 4.381 1.056 1.804-.034 2.95-1.64 4.04-3.26 1.273-1.86 1.794-3.662 1.826-3.756-.04-.017-3.505-1.344-3.538-5.338m-3.207-9.507c.927-1.106 1.555-2.635 1.383-4.164-1.34.056-2.96.894-3.926 2.015-.875 1.002-1.632 2.587-1.426 4.118 1.514.118 3.056-.774 3.97-1.97"/>
              </svg>
              <span className="text-left text-sm">
                <span className="block text-xs text-white/70">
                  {lang === "en" ? "Download From" : "बाट डाउनलोड गर्नुहोस्"}
                </span>
                <strong className="block text-base font-bold">
                  {lang === "en" ? "Google Play" : "गुगल प्ले"}
                </strong>
              </span>
            </a>
            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-black/30 px-6 py-3 text-white backdrop-blur transition-all hover:bg-black/40 hover:-translate-y-0.5"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-left text-sm">
                <span className="block text-xs text-white/70">
                  {lang === "en" ? "Download From" : "बाट डाउनलोड गर्नुहोस्"}
                </span>
                <strong className="block text-base font-bold">
                  {lang === "en" ? "App Store" : "एप स्टोर"}
                </strong>
              </span>
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Smartphone className="h-24 w-24 text-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
