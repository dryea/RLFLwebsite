import PublicLayout from "@/components/layout/PublicLayout";
import { serverFetchAPI } from "@/lib/server-api";
import FaqAccordion from "@/components/shared/FaqAccordion";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await serverFetchAPI("/api/faq");

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Frequently Asked Questions</h1><p className="mt-2 text-primary-100">Find answers to common questions</p></div>
      </section>
      <section className="py-12">
        <div className="container-page max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </PublicLayout>
  );
}
