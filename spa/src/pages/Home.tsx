import { MainLayout } from "../components/layouts/Master";

export function HomePage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center flex-grow h-full bg-black text-white">
        <h1 className="text-2xl">Home Page</h1>
      </div>
    </MainLayout>
  );
}
