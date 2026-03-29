import { RegistrationWizard } from "@/components/wizard/registration-wizard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-sand bg-hero-grid px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RegistrationWizard />
      </div>
    </main>
  );
}
