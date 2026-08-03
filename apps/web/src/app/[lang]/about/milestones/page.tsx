const API = process.env.NEXT_PUBLIC_API_URL || "https://rfil-api.sudeepdhakal.workers.dev";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Milestones" : "कोशेढुङ्गाहरू",
    description: lang === "en"
      ? "Key milestones and achievements in the journey of Reliance Finance Limited."
      : "रिलायन्स फाइनान्स लिमिटेडको यात्राका प्रमुख कोशेढुङ्गा र उपलब्धिहरू।",
  };
}

export default async function MilestonesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let milestones: any[] = [];
  try {
    const res = await fetch(`${API}/api/pages/milestones`);
    if (res.ok) {
      const data = await res.json();
      milestones = Array.isArray(data) ? data : data.data ? data.data : [];
    }
  } catch {}

  const defaultMilestones = lang === "en"
    ? [
        { year: "2001", title: "Company Incorporation", description: "Reliance Finance Limited was incorporated as a public limited company under the Companies Act." },
        { year: "2002", title: "NRB License", description: "Received operating license from Nepal Rastra Bank as a C-class finance company." },
        { year: "2003", title: "First Branch Opening", description: "Opened our first branch office in Kamaladi, Kathmandu, commencing banking operations." },
        { year: "2005", title: "Network Expansion", description: "Expanded operations with new branches in New Road and Pokhara." },
        { year: "2008", title: "Digital Banking Launch", description: "Introduced digital banking services including SMS banking and online account access." },
        { year: "2010", title: "Capital Enhancement", description: "Increased paid-up capital to meet NRB's revised minimum capital requirement." },
        { year: "2013", title: "Product Diversification", description: "Launched new loan products including home loans, education loans, and hire purchase schemes." },
        { year: "2015", title: "Disaster Recovery", description: "Demonstrated resilience by quickly resuming operations after the 2015 earthquake, supporting community relief efforts." },
        { year: "2018", title: "Core Banking Upgrade", description: "Implemented modern core banking system for improved efficiency and customer service." },
        { year: "2020", title: "Digital Acceleration", description: "Accelerated digital transformation in response to the pandemic, launching enhanced mobile banking services." },
        { year: "2022", title: "Capital Milestone", description: "Achieved significant capital growth, reinforcing the company's financial strength." },
        { year: "2024", title: "Strategic Growth", description: "Continued branch expansion and product innovation, strengthening market position in Nepal's financial sector." },
      ]
    : [
        { year: "२००१", title: "कम्पनी स्थापना", description: "रिलायन्स फाइनान्स लिमिटेड कम्पनी ऐन अन्तर्गत सार्वजनिक लिमिटेड कम्पनीको रूपमा स्थापित भयो।" },
        { year: "२००२", title: "NRB इजाजतपत्र", description: "नेपाल राष्ट्र बैंकबाट वर्ग 'ग' वित्तीय कम्पनीको रूपमा सञ्चालन इजाजतपत्र प्राप्त।" },
        { year: "२००३", title: "पहिलो शाखा उद्घाटन", description: "कमलादी, काठमाडौंमा पहिलो शाखा कार्यालय खोली बैंकिङ सञ्चालन सुरू गरियो।" },
        { year: "२००५", title: "सञ्जाल विस्तार", description: "नयाँ सडक र पोखरामा नयाँ शाखाहरू सहित सञ्चालन विस्तार।" },
        { year: "२००८", title: "डिजिटल बैंकिङ सुरूवात", description: "एसएमएस बैंकिङ र अनलाइन खाता पहुँच सहित डिजिटल बैंकिङ सेवाहरूको सुरूवात।" },
        { year: "२०१०", title: "पुँजी वृद्धि", description: "NRB को संशोधित न्यूनतम पुँजी आवश्यकता पूरा गर्न चुक्ता पुँजी वृद्धि।" },
        { year: "२०१३", title: "उत्पादन विविधीकरण", description: "घर ऋण, शिक्षा ऋण र हायर पर्चेज योजनाहरू सहित नयाँ ऋण उत्पादनहरूको सुरूवात।" },
        { year: "२०१५", title: "विपद् पुनरुत्थान", description: "२०७२ को भूकम्प पछि द्रुत रूपमा सञ्चालन पुनः सुरू गरी समुदायको राहत प्रयासहरूमा सहयोग।" },
        { year: "२०१८", title: "कोर बैंकिङ स्तरोन्नति", description: "सुधारिएको दक्षता र ग्राहक सेवाको लागि आधुनिक कोर बैंकिङ प्रणालीको कार्यान्वयन।" },
        { year: "२०२०", title: "डिजिटल प्रवेग", description: "महामारीको प्रतिक्रियामा डिजिटल रूपान्तरणलाई गति दिँदै, परिष्कृत मोबाइल बैंकिङ सेवाहरू सुरूवात।" },
        { year: "२०२२", title: "पुँजी कोशेढुङ्गा", description: "महत्वपूर्ण पुँजी वृद्धि हासिल गर्दै, कम्पनीको वित्तीय शक्तिलाई सुदृढ पारियो।" },
        { year: "२०२४", title: "रणनीतिक वृद्धि", description: "निरन्तर शाखा विस्तार र उत्पादन नवाचार, नेपालको वित्तीय क्षेत्रमा बजार स्थिति सुदृढीकरण।" },
      ];

  const display = milestones.length > 0 ? milestones : defaultMilestones;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold">
            {lang === "en" ? "Milestones" : "कोशेढुङ्गाहरू"}
          </h1>
          <p className="max-w-3xl text-lg text-primary-100">
            {lang === "en"
              ? "Key milestones and achievements throughout our journey"
              : "हाम्रो यात्राका प्रमुख कोशेढुङ्गा र उपलब्धिहरू"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-primary-200" />
          <div className="space-y-10">
            {display.map((m: any, i: number) => (
              <div key={i} className="relative pl-16">
                <div className="absolute left-3.5 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary-700 bg-white">
                  <div className="h-2 w-2 rounded-full bg-primary-700" />
                </div>
                <div className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="mb-1 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-800">
                    {m.year}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{m.title}</h3>
                  <p className="leading-relaxed text-gray-600">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
