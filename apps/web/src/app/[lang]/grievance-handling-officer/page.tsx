import { serverFetchAPI } from "@/lib/server-api";
import GrievanceForm from "./GrievanceForm";

export const dynamic = "force-dynamic";

const defaultContent = {
  en: {
    title: "Grievance Handling Officer",
    subtitle: "We value your feedback and are committed to resolving your concerns promptly.",
    officerName: "Mr. Rajan Shrestha",
    officerRole: "Chief Financial Officer & Grievance Handling Officer",
    about: "The Grievance Handling Officer is responsible for receiving, reviewing, and resolving complaints from customers and stakeholders in a fair, transparent, and timely manner.",
    process: [
      "Submit your complaint via the form below, email, or in writing at any branch.",
      "The officer acknowledges receipt within 3 working days.",
      "A thorough investigation is conducted and a resolution is proposed within 15 working days.",
      "If unsatisfied, you may escalate to the Chief Executive Officer.",
    ],
    contact: "Contact: 01-5971000 | Email: grievance@reliancenepal.com.np",
  },
  np: {
    title: "गुनासो व्यवस्थापन अधिकृत",
    subtitle: "हामी तपाईंको प्रतिक्रियालाई महत्व दिन्छौं र तपाईंको सरोकारहरू तुरुन्त समाधान गर्न प्रतिबद्ध छौं।",
    officerName: "श्री राजन श्रेष्ठ",
    officerRole: "प्रमुख वित्तीय अधिकृत र गुनासो व्यवस्थापन अधिकृत",
    about: "गुनासो व्यवस्थापन अधिकृत ग्राहक र सरोकारवालाहरूबाट प्राप्त उजुरीहरू निष्पक्ष, पारदर्शी र समयबद्ध रूपमा प्राप्त गर्ने, समीक्षा गर्ने र समाधान गर्ने जिम्मेवार हुनुहुन्छ।",
    process: [
      "तलको फारम, इमेल वा कुनै पनि शाखामा लिखित रूपमा आफ्नो उजुरी पेश गर्नुहोस्।",
      "अधिकृतले ३ कार्य दिनभित्र प्राप्तिको पुष्टि गर्नुहुन्छ।",
      "१५ कार्य दिनभित्र गहन छानबिन गरी समाधान प्रस्ताव गरिन्छ।",
      "यदि सन्तुष्ट हुनुहुन्न भने, तपाईं प्रमुख कार्यकारी अधिकृतकहाँ उजुरी गर्न सक्नुहुन्छ।",
    ],
    contact: "सम्पर्क: ०१-५९७१००० | इमेल: grievance@reliancenepal.com.np",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === "en" ? "Grievance Handling Officer | Reliance Finance Limited" : "गुनासो व्यवस्थापन अधिकृत | रिलायन्स फाइनान्स लिमिटेड",
    description: lang === "en" ? "File a complaint or grievance with Reliance Finance Limited." : "रिलायन्स फाइनान्स लिमिटेडमा उजुरी वा गुनासो दर्ता गर्नुहोस्।",
  };
}

export default async function GrievancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang as "en" | "np";
  let cms: any = null;
  try {
    cms = await serverFetchAPI("/api/pages/grievance-handling-officer");
  } catch {}
  const content = defaultContent[l];
  const cmsHtml = lang === "np" ? (cms?.contentNp || cms?.content) : (cms?.content || cms?.contentNp);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">{cms?.title || content.title}</h1>
          <p className="mt-2 text-primary-100">{cms?.titleNp && lang === "np" ? cms.titleNp : content.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page space-y-8">
          {cmsHtml && (
            <div className="prose max-w-none rounded-xl border bg-white p-6 shadow-sm" dangerouslySetInnerHTML={{ __html: cmsHtml }} />
          )}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{content.officerName}</h2>
              <p className="text-sm text-primary-700">{content.officerRole}</p>
              <p className="mt-4 text-gray-600">{content.about}</p>
              <p className="mt-3 text-sm text-gray-500">{content.contact}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Complaint Submission Process" : "उजुरी दर्ता प्रक्रिया"}
              </h2>
              <ol className="mt-4 space-y-3">
                {content.process.map((step: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">{i + 1}</span>
                    <span className="pt-1 text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 rounded-xl border bg-gray-50 p-6">
              <h2 className="text-lg font-bold text-gray-900">
                {lang === "en" ? "Submit a Complaint" : "उजुरी दर्ता गर्नुहोस्"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {lang === "en" ? "Fill out the form below to submit your grievance." : "आफ्नो गुनासो पेश गर्न तलको फारम भर्नुहोस्।"}
              </p>
              <GrievanceForm lang={lang} />
            </div>
        </div>
      </section>
    </>
  );
}
