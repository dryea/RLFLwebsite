"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const enContent = [
  { title: "Information We Collect", body: "We collect personal information such as name, address, phone number, email, citizenship details, financial history, and transaction data when you use our services or visit our website." },
  { title: "How We Use Your Information", body: "We use your information to process transactions, provide customer service, comply with legal and regulatory requirements, improve our services, and communicate with you about products and offers." },
  { title: "Information Sharing", body: "We do not sell your personal information. We may share it with regulatory authorities as required by law, with service providers under strict confidentiality agreements, and with credit information bureaus." },
  { title: "Data Security", body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction." },
  { title: "Your Rights", body: "You have the right to access, correct, or delete your personal data held by us. You may also restrict or object to certain processing activities." },
  { title: "Cookies", body: "Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences." },
  { title: "Contact Us", body: "For privacy-related inquiries, please contact our Data Protection Officer at info@reliancenepal.com.np or call +977-01-5361104." },
];

const npContent = [
  { title: "हामीले सङ्कलन गर्ने जानकारी", body: "हामी तपाईंको नाम, ठेगाना, फोन नम्बर, इमेल, नागरिकता विवरण, वित्तीय इतिहास, र कारोबार डेटा जस्ता व्यक्तिगत जानकारी सङ्कलन गर्दछौं जब तपाईं हाम्रो सेवाहरू प्रयोग गर्नुहुन्छ वा हाम्रो वेबसाइट भ्रमण गर्नुहुन्छ।" },
  { title: "हामी तपाईंको जानकारी कसरी प्रयोग गर्छौं", body: "हामी तपाईंको जानकारी कारोबार प्रक्रिया गर्न, ग्राहक सेवा प्रदान गर्न, कानुनी र नियामक आवश्यकताहरूको पालना गर्न, हाम्रो सेवाहरू सुधार गर्न, र उत्पादन र प्रस्तावहरूको बारेमा सञ्चार गर्न प्रयोग गर्दछौं।" },
  { title: "जानकारी साझेदारी", body: "हामी तपाईंको व्यक्तिगत जानकारी बेच्दैनौं। हामी कानूनद्वारा आवश्यक भएमा नियामक अधिकारीहरूसँग, कडा गोपनीयता सम्झौता अन्तर्गत सेवा प्रदायकहरूसँग, र क्रेडिट सूचना ब्यूरोहरूसँग साझेदारी गर्न सक्छौं।" },
  { title: "डेटा सुरक्षा", body: "हामी तपाईंको व्यक्तिगत डेटालाई अनधिकृत पहुँच, परिवर्तन, खुलासा, वा विनाश विरुद्ध सुरक्षित गर्न उपयुक्त प्राविधिक र संगठनात्मक उपायहरू लागू गर्दछौं।" },
  { title: "तपाईंको अधिकार", body: "तपाईंलाई हामीसँग भएको आफ्नो व्यक्तिगत डेटा पहुँच गर्न, सच्याउन वा मेटाउन अधिकार छ। तपाईं निश्चित प्रशोधन गतिविधिहरू प्रतिबन्ध वा आपत्ति पनि गर्न सक्नुहुन्छ।" },
  { title: "कुकीज", body: "हाम्रो वेबसाइटले तपाईंको ब्राउजिङ अनुभव बढाउन कुकीज प्रयोग गर्दछ। तपाईं आफ्नो ब्राउजर प्राथमिकताहरू मार्फत कुकी सेटिङहरू नियन्त्रण गर्न सक्नुहुन्छ।" },
  { title: "सम्पर्क गर्नुहोस्", body: "गोपनीयता-सम्बन्धित सोधपुछको लागि, कृपया हाम्रो डेटा संरक्षण अधिकारीलाई info@reliancenepal.com.np मा सम्पर्क गर्नुहोस् वा +977-01-5361104 मा कल गर्नुहोस्।" },
];

export default function PrivacyPolicyPage() {
  const lang = useLang();
  const content = lang === "en" ? enContent : npContent;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-secondary-300" />
            <div>
              <h1 className="text-3xl font-bold">
                {lang === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
              </h1>
              <p className="mt-1 text-primary-100">
                {lang === "en" ? "How we handle your personal information" : "हामी तपाईंको व्यक्तिगत जानकारी कसरी ह्यान्डल गर्छौं"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page max-w-3xl">
          <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm text-sm text-gray-500 leading-relaxed">
            <p>
              <strong>{lang === "en" ? "Last updated:" : "पछिल्लो अद्यावधिक:"}</strong>{" "}
              {lang === "en" ? "January 2025" : "जनवरी २०२५"}
            </p>
            <p className="mt-2">
              {lang === "en"
                ? "At Reliance Finance Limited, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information."
                : "रिलायन्स फाइनान्स लिमिटेडमा, हामी तपाईंको गोपनीयताको रक्षा गर्न प्रतिबद्ध छौं। यो नीतिले हामी कसरी तपाईंको व्यक्तिगत जानकारी सङ्कलन, प्रयोग र सुरक्षा गर्छौं भनेर व्याख्या गर्दछ।"}
            </p>
          </div>

          <div className="space-y-6">
            {content.map((section, i) => (
              <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-gray-900">{section.title}</h2>
                <p className="text-sm leading-relaxed text-gray-600">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
