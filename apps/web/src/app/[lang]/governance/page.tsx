import { serverFetchAPI } from "@/lib/server-api";

const defaultTeams = [
  {
    category: { en: "Board of Directors", np: "सञ्चालक समिति" },
    members: [
      { name: "Mr. Shiva Ram KC", position: { en: "Chairperson", np: "अध्यक्ष" } },
      { name: "Mr. Pradeep Kumar Shrestha", position: { en: "Director", np: "सञ्चालक" } },
      { name: "Mr. Bishnu Prasad Neupane", position: { en: "Director", np: "सञ्चालक" } },
      { name: "Mr. Sagar Rajbhandari", position: { en: "Independent Director", np: "स्वतन्त्र सञ्चालक" } },
    ],
  },
  {
    category: { en: "Management Team", np: "व्यवस्थापन टोली" },
    members: [
      { name: "Mr. Gyanendra Prasad Dhungana", position: { en: "Chief Executive Officer", np: "प्रमुख कार्यकारी अधिकृत" } },
      { name: "Mr. Rajan Shrestha", position: { en: "Chief Financial Officer", np: "प्रमुख वित्तीय अधिकृत" } },
      { name: "Mr. Sushil Adhikari", position: { en: "Chief Operating Officer", np: "प्रमुख सञ्चालन अधिकृत" } },
      { name: "Mr. Binod Poudel", position: { en: "Chief Risk Officer", np: "प्रमुख जोखिम अधिकृत" } },
    ],
  },
  {
    category: { en: "Department Heads", np: "विभाग प्रमुखहरू" },
    members: [
      { name: "Mr. Ram Chandra Pokharel", position: { en: "Head - Credit Department", np: "प्रमुख - ऋण विभाग" } },
      { name: "Ms. Sunita Sharma", position: { en: "Head - Marketing & Product", np: "प्रमुख - मार्केटिङ र उत्पादन" } },
      { name: "Mr. Dipak Thapa", position: { en: "Head - IT & Digital Banking", np: "प्रमुख - सूचना प्रविधि र डिजिटल बैंकिङ" } },
    ],
  },
  {
    category: { en: "Branch Managers", np: "शाखा प्रबन्धकहरू" },
    members: [
      { name: "Mr. Krishna Acharya", position: { en: "Manager - Kamaladi Branch", np: "प्रबन्धक - कमलादी शाखा" } },
      { name: "Mr. Sagar Timilsina", position: { en: "Manager - New Road Branch", np: "प्रबन्धक - नयाँ सडक शाखा" } },
      { name: "Mr. Anil Shrestha", position: { en: "Manager - Pokhara Branch", np: "प्रबन्धक - पोखरा शाखा" } },
    ],
  },
];

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Governance | Reliance Finance Limited" : "सुशासन | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "Our leadership and management team" : "हाम्रो नेतृत्व र व्यवस्थापन टोली",
  };
}

export default async function GovernancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  let teams;
  try {
    teams = await serverFetchAPI("/api/cms/teams");
  } catch {
    teams = [];
  }
  const displayTeams = Array.isArray(teams) && teams.length > 0 ? teams : defaultTeams;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{lang === "en" ? "Governance" : "सुशासन"}</h1>
          <p className="mt-2 text-primary-100">{lang === "en" ? "Our leadership and management team" : "हाम्रो नेतृत्व र व्यवस्थापन टोली"}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="space-y-12">
            {displayTeams.map((group: any, gi: number) => (
              <div key={gi}>
                <h2 className="mb-6 inline-block border-b-2 border-primary-100 pb-2 text-xl font-bold text-gray-900">
                  {lang === "en" ? (typeof group.category === "object" ? group.category.en : group.category) : (typeof group.category === "object" ? group.category.np : group.category)}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {(group.members || []).map((m: any, mi: number) => (
                    <div key={mi} className="rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">{m.name.charAt(0)}</div>
                      <h3 className="font-semibold text-gray-900">{m.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {lang === "en" ? (typeof m.position === "object" ? m.position.en : m.position) : (typeof m.position === "object" ? m.position.np : m.position)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
