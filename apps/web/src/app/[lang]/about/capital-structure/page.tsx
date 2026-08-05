import { API } from "@/lib/api";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Capital Structure" : "पुँजी संरचना",
    description: lang === "en"
      ? "Capital structure and shareholding details of Reliance Finance Limited."
      : "रिलायन्स फाइनान्स लिमिटेडको पुँजी संरचना र सेयरधनी विवरण।",
  };
}

export default async function CapitalStructurePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let page: any = null;
  try {
    const res = await fetch(`${API}/api/pages/capital-structure`);
    if (res.ok) page = await res.json();
  } catch {}

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16 text-white">
        <div className="container-page">
          <h1 className="mb-4 text-4xl font-bold">
            {lang === "en" ? "Capital Structure" : "पुँजी संरचना"}
          </h1>
          <p className="max-w-3xl text-lg text-primary-100">
            {lang === "en"
              ? "Our capital base and shareholding information"
              : "हाम्रो पुँजी आधार र सेयरधनी जानकारी"}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        {page ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content || page.body || "" }} />
        ) : (
          <div className="space-y-10">
            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Capital Overview" : "पुँजी सिंहावलोकन"}
              </h2>
              <p className="mb-6 leading-relaxed text-gray-700">
                {lang === "en"
                  ? "Reliance Finance Limited maintains a robust capital base in compliance with Nepal Rastra Bank's regulatory requirements. The company's capital structure is designed to support sustainable growth while ensuring financial stability and protecting depositor interests."
                  : "रिलायन्स फाइनान्स लिमिटेडले नेपाल राष्ट्र बैंकको नियामक आवश्यकताहरूको अनुपालनमा बलियो पुँजी आधार कायम गरेको छ। कम्पनीको पुँजी संरचना दिगो वृद्धिलाई समर्थन गर्न डिजाइन गरिएको छ साथै वित्तीय स्थिरता सुनिश्चित गर्न र निक्षेपकर्ताको हितको रक्षा गर्न।"}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary-100">
                      <th className="pb-3 font-semibold text-gray-900">
                        {lang === "en" ? "Particulars" : "विवरण"}
                      </th>
                      <th className="pb-3 text-right font-semibold text-gray-900">
                        {lang === "en" ? "Amount (NPR)" : "रकम (नेपाली रूपैयाँ)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(
                      lang === "en"
                        ? [
                            { label: "Authorized Capital", amount: "500,000,000" },
                            { label: "Issued Capital", amount: "350,000,000" },
                            { label: "Paid-up Capital", amount: "350,000,000" },
                            { label: "Reserve & Surplus", amount: "120,000,000" },
                            { label: "Total Shareholders' Equity", amount: "470,000,000" },
                          ]
                        : [
                            { label: "अधिकृत पुँजी", amount: "५०,००,००,०००" },
                            { label: "जारी पुँजी", amount: "३५,००,००,०००" },
                            { label: "चुक्ता पुँजी", amount: "३५,००,००,०००" },
                            { label: "आरक्षित कोष", amount: "१२,००,००,०००" },
                            { label: "कुल सेयरधनी कोष", amount: "४७,००,००,०००" },
                          ]
                    ).map((row, i) => (
                      <tr key={i} className={i === 4 ? "bg-primary-50/50 font-semibold" : ""}>
                        <td className="py-3 text-gray-700">{row.label}</td>
                        <td className="py-3 text-right text-gray-900">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Shareholding Pattern" : "सेयरधनी स्वामित्व संरचना"}
              </h2>
              <p className="mb-6 leading-relaxed text-gray-700">
                {lang === "en"
                  ? "The company's shares are held by a diverse group of institutional and individual investors. Our shareholding structure reflects broad-based ownership with active participation from promoters, financial institutions, and the general public."
                  : "कम्पनीको सेयरहरू संस्थागत र व्यक्तिगत लगानीकर्ताहरूको विविध समूहसँग छ। हाम्रो सेयरधनी संरचनाले प्रवर्द्धक, वित्तीय संस्था र सर्वसाधारणको सक्रिय सहभागिताका साथ व्यापक स्वामित्वलाई प्रतिबिम्बित गर्दछ।"}
              </p>
              <div className="space-y-4">
                {(
                  lang === "en"
                    ? [
                        { group: "Promoter / Sponsor Shareholders", x: 60, color: "bg-primary-700" },
                        { group: "General Public", x: 25, color: "bg-primary-500" },
                        { group: "Institutional Investors", x: 10, color: "bg-primary-400" },
                        { group: "Employees & Others", x: 5, color: "bg-primary-300" },
                      ]
                    : [
                        { group: "प्रवर्द्धक / प्रायोजक सेयरधनीहरू", x: 60, color: "bg-primary-700" },
                        { group: "सर्वसाधारण", x: 25, color: "bg-primary-500" },
                        { group: "संस्थागत लगानीकर्ता", x: 10, color: "bg-primary-400" },
                        { group: "कर्मचारी र अन्य", x: 5, color: "bg-primary-300" },
                      ]
                ).map((s, i) => (
                  <div key={i}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{s.group}</span>
                      <span className="text-gray-500">{s.x}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${s.x}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "en" ? "Regulatory Compliance" : "नियामक अनुपालन"}
              </h2>
              <p className="leading-relaxed text-gray-700">
                {lang === "en"
                  ? "Reliance Finance Limited fully complies with the capital adequacy requirements prescribed by Nepal Rastra Bank under the Basel III framework. Our Capital Adequacy Ratio (CAR) is maintained well above the regulatory minimum, demonstrating our financial strength and commitment to prudent risk management."
                  : "रिलायन्स फाइनान्स लिमिटेडले बासेल III ढाँचा अन्तर्गत नेपाल राष्ट्र बैंकले तोकेको पुँजी पर्याप्तता आवश्यकताहरूको पूर्ण पालना गर्दछ। हाम्रो पुँजी पर्याप्तता अनुपात (CAR) नियामक न्यूनतम भन्दा माथि कायम गरिएको छ, जसले हाम्रो वित्तीय शक्ति र विवेकपूर्ण जोखिम व्यवस्थापनप्रति प्रतिबद्धता देखाउँदछ।"}
              </p>
              <ul className="mt-4 space-y-2">
                {(
                  lang === "en"
                    ? [
                        "Capital Adequacy Ratio (CAR): Maintained above NRB minimum requirement",
                        "Tier 1 Capital: Comprising paid-up capital, reserves, and retained earnings",
                        "Tier 2 Capital: Subordinated debt and general loan loss provisions",
                        "CCD Ratio: Within regulatory limits prescribed by Nepal Rastra Bank",
                        "All financial disclosures audited and filed with NRB as per regulatory schedule",
                      ]
                    : [
                        "पुँजी पर्याप्तता अनुपात (CAR): NRB न्यूनतम आवश्यकता भन्दा माथि कायम",
                        "स्तर १ पुँजी: चुक्ता पुँजी, आरक्षित कोष र संचित मुनाफा समावेश",
                        "स्तर २ पुँजी: अधिनस्थ ऋण र सामान्य ऋण नोक्सान प्रावधान",
                        "CCD अनुपात: नेपाल राष्ट्र बैंकले तोकेको नियामक सीमा भित्र",
                        "सबै वित्तीय जानकारी लेखापरीक्षण गरी नियामक तालिका अनुसार NRB मा पेश",
                      ]
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1 text-primary-700">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
