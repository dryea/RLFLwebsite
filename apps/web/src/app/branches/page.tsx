import PublicLayout from "@/components/layout/PublicLayout";
import { serverFetchAPI } from "@/lib/server-api";
import BranchList from "@/components/shared/BranchList";

export const revalidate = 300;

export default async function BranchesPage() {
  const branches = await serverFetchAPI("/api/cms/branches");

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page"><h1 className="text-3xl font-bold">Branches</h1><p className="mt-2 text-primary-100">Find a branch near you</p></div>
      </section>
      <section className="py-12">
        <div className="container-page">
          <BranchList branches={branches} />
        </div>
      </section>
    </PublicLayout>
  );
}
