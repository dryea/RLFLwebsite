import PublicLayout from "@/components/layout/PublicLayout";
import EMICalculator from "@/components/shared/EMICalculator";

export const metadata = {
  title: "EMI Calculator | Reliance Finance Limited",
  description: "Plan your loan with accurate monthly payments using the Reliance Finance EMI calculator.",
};

export default function EMICalculatorPage() {
  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">EMI Calculator</h1>
          <p className="mt-2 text-primary-100">Plan your loan with accurate monthly payments</p>
        </div>
      </section>
      <EMICalculator lang="en" />
    </PublicLayout>
  );
}
