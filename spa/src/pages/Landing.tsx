import { MainLayout } from "../components/layouts/Master";

export function LandingPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center flex-grow h-full bg-black text-white">
        <h1 className="text-2xl">ViteCloud</h1>
      </div>
    </MainLayout>
  );
}
