"use client";

import { type ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

interface HomepageSectionsProps {
  offerings: ReactNode;
  about: ReactNode;
  emi: ReactNode;
  news: ReactNode;
  csr: ReactNode | null;
  appBanner: ReactNode;
  lang: string;
}

export default function HomepageSections({
  offerings,
  about,
  emi,
  news,
  csr,
  appBanner,
  lang,
}: HomepageSectionsProps) {
  return (
    <>
      <Reveal type="fadeUp">
        <section className="section bg-white">
          <div className="container-page">
            <div className="section-header">
              <h2>{lang === "en" ? "Our Core Offerings" : "हाम्रा मुख्य सेवाहरू"}</h2>
              <p>{lang === "en" ? "Explore our wide range of tailored financial products designed to build your future and foster mutual growth." : "तपाईंको भविष्य निर्माण गर्न र पारस्परिक वृद्धिलाई बढावा दिन डिजाइन गरिएका हाम्रा अनुकूलित वित्तीय उत्पादनहरूको विस्तृत श्रृंखला अन्वेषण गर्नुहोस्।"}</p>
            </div>
            {offerings}
          </div>
        </section>
      </Reveal>

      <Reveal type="fadeUp" delay={0.1}>
        {about}
      </Reveal>

      <Reveal type="fadeUp" delay={0.1}>
        <section className="section bg-white">
          <div className="container-page">
            <div className="section-header">
              <h2>{lang === "en" ? "Quick Loan EMI Estimator" : "द्रुत ऋण EMI अनुमानक"}</h2>
              <p>{lang === "en" ? "Plan your expenses efficiently. Adjust the sliders below to get a quick estimate of your monthly installments." : "आफ्नो खर्च कुशलतापूर्वक योजना गर्नुहोस्। आफ्नो मासिक किस्ताको द्रुत अनुमान प्राप्त गर्न तलका स्लाइडरहरू समायोजन गर्नुहोस्।"}</p>
            </div>
            {emi}
          </div>
        </section>
      </Reveal>

      <Reveal type="fadeUp" delay={0.1}>
        <section className="section bg-surface-alt">
          <div className="container-page">
            <div className="section-header">
              <h2>{lang === "en" ? "Latest Highlights & Events" : "पछिल्लो हाइलाइट्स र कार्यक्रमहरू"}</h2>
              <p>{lang === "en" ? "Stay up to date with our recent corporate announcements, community services, and public notices." : "हाम्रो हालैका कर्पोरेट घोषणाहरू, सामुदायिक सेवाहरू र सार्वजनिक सूचनाहरूसँग अद्यावधिक रहनुहोस्।"}</p>
            </div>
            {news}
          </div>
        </section>
      </Reveal>

      {csr && (
        <Reveal type="fadeUp" delay={0.1}>
          <section className="section bg-white">
            <div className="container-page">
              <div className="section-header">
                <h2>{lang === "en" ? "Corporate Social Responsibility" : "कर्पोरेट सामाजिक उत्तरदायित्व"}</h2>
                <p>{lang === "en" ? "Making a difference where it matters. We commit ourselves to enhancing public health, education, and relief efforts across Nepal." : "जहाँ महत्त्व छ त्यहाँ परिवर्तन ल्याउँदै। हामी नेपालभर सार्वजनिक स्वास्थ्य, शिक्षा र राहत प्रयासहरू बढाउन प्रतिबद्ध छौं।"}</p>
              </div>
              {csr}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal type="fadeUp" delay={0.1}>
        <section className="section bg-surface-alt">
          <div className="container-page">
            {appBanner}
          </div>
        </section>
      </Reveal>
    </>
  );
}
