import { MainLayout } from "../../components/layouts/Master";

export function LogoutPage() {
  localStorage.removeItem("jwt");
  window.location.href = "/";
  return (
    <MainLayout>
      <div className="flex items-center justify-center flex-grow h-full bg-black text-white">
        <h1 className="text-2xl">Logging out...</h1>
      </div>
    </MainLayout>
  );
}
