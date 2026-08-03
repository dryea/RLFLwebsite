import PublicLayout from "@/components/layout/PublicLayout";
import CalendarPage from "@/components/shared/CalendarPage";

export const metadata = {
  title: "Calendar | Reliance Finance Limited",
  description: "Upcoming events, festivals & holidays",
};

export default function CalendarRootPage() {
  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-12 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="mt-2 text-primary-100">Upcoming events, festivals & holidays</p>
        </div>
      </section>
      <CalendarPage lang="en" />
    </PublicLayout>
  );
}
