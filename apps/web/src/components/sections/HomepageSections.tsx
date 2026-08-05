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
      {/* Offerings Grid — white bg */}
      <Reveal type="fadeUp">
        <section className="section bg-white">
          <div className="container-page">
            {offerings}
          </div>
        </section>
      </Reveal>

      {/* About + Stats — subtle tinted bg */}
      <Reveal type="fadeUp" delay={0.05}>
        <section className="section" style={{ background: "linear-gradient(135deg, #faf5fc 0%, #ffffff 60%, #faf5fc 100%)" }}>
          <div className="container-page">
            {about}
          </div>
        </section>
      </Reveal>

      {/* EMI Calculator — white bg */}
      <Reveal type="fadeUp" delay={0.05}>
        <section className="section bg-white">
          <div className="container-page">
            {emi}
          </div>
        </section>
      </Reveal>

      {/* News & Events — surface alt bg */}
      <Reveal type="fadeUp" delay={0.05}>
        <section className="section bg-surface-alt">
          <div className="container-page">
            {news}
          </div>
        </section>
      </Reveal>

      {/* CSR — white bg (conditional) */}
      {csr && (
        <Reveal type="fadeUp" delay={0.05}>
          <section className="section bg-white">
            <div className="container-page">
              {csr}
            </div>
          </section>
        </Reveal>
      )}

      {/* App Banner — full-width, no outer container */}
      <Reveal type="fadeUp" delay={0.05}>
        {appBanner}
      </Reveal>
    </>
  );
}
