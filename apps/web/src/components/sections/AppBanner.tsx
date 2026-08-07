interface AppBannerData {
  title?: string;
  titleNp?: string;
  description?: string;
  descriptionNp?: string;
  androidUrl?: string;
  iosUrl?: string;
  badgeText?: string;
}

export default function AppBanner({ data, lang }: { data: AppBannerData | null; lang: string }) {
  const d = data || {};
  const isNp = lang === "np";
  const title = d.title || "Download Reliance Finance Smart App";
  const description = d.description || "Access your account, make QR payments, pay bills, check loan details, and more — all from your phone.";
  const androidUrl = d.androidUrl || "https://play.google.com/store/apps/details?id=com.f1soft.reliancefinance";
  const iosUrl = d.iosUrl || "https://apps.apple.com/np/app/reliance-finance-smart/id1554035637";

  return (
    <section className="overflow-hidden" aria-label="Mobile app download">
      <div
        className="relative"
        style={{ background: "linear-gradient(135deg, #52216B 0%, #8E44AD 50%, #7B379B 100%)" }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(242,169,0,0.12) 0%, transparent 60%)" }} />

        <div className="container-page relative z-10">
          <div className="grid items-center gap-10 py-16 md:grid-cols-[1.3fr_0.7fr]">
            {/* Text */}
            <div>
              <span className="mb-3 inline-block rounded-full bg-secondary-500/25 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-secondary-300">
                {isNp ? "डिजिटल बैंकिङ" : "Digital Banking"}
              </span>
              <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
                {isNp && d.titleNp ? d.titleNp : title}
              </h2>
              <p className="mb-8 max-w-lg leading-relaxed text-white/70">
                {isNp && d.descriptionNp ? d.descriptionNp : description}
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Android badge */}
                <a
                  href={androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 font-bold text-gray-900 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <svg className="h-7 w-7 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 12.59c.034-3.076 2.694-4.544 2.82-4.614-1.54-2.252-3.926-2.56-4.777-2.594-2.034-.206-3.973 1.196-5.007 1.196-1.04 0-2.645-1.17-4.35-1.138-2.236.034-4.302 1.3-5.456 3.304-2.343 4.063-.603 10.082 1.677 13.378 1.115 1.613 2.44 3.423 4.187 3.357 1.68-.068 2.313-1.09 4.347-1.09 2.023 0 2.61 1.09 4.381 1.056 1.804-.034 2.95-1.64 4.04-3.26 1.273-1.86 1.794-3.662 1.826-3.756-.04-.017-3.505-1.344-3.538-5.338m-3.207-9.507c.927-1.106 1.555-2.635 1.383-4.164-1.34.056-2.96.894-3.926 2.015-.875 1.002-1.632 2.587-1.426 4.118 1.514.118 3.056-.774 3.97-1.97" />
                  </svg>
                  <span>
                    <span className="block text-[0.65rem] font-medium uppercase tracking-wide text-gray-500">{isNp ? "बाट डाउनलोड" : "Download on"}</span>
                    <strong className="block text-sm leading-tight">Google Play</strong>
                  </span>
                </a>

                {/* iOS badge */}
                <a
                  href={iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 font-bold text-gray-900 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <svg className="h-7 w-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span>
                    <span className="block text-[0.65rem] font-medium uppercase tracking-wide text-gray-500">{isNp ? "बाट डाउनलोड" : "Download on the"}</span>
                    <strong className="block text-sm leading-tight">App Store</strong>
                  </span>
                </a>
              </div>
            </div>

            {/* Phone mockup with float animation */}
            <div className="hidden justify-end md:flex">
              <img
                src="/assets/mobilebankingWebImage.png"
                alt="RFL Smart mobile banking app"
                className="max-h-[340px] w-auto animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
