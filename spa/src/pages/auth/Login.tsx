import { Loading } from "../../components/animations/loading";
import { AuthLayout } from "../../components/layouts/Auth";
import { useEffect, useState } from "react";
export function LoginPage({
  routeOnSuccess = "/home",
}: {
  routeOnSuccess?: string;
}) {
  const searchParams = new URLSearchParams(window.location.search);
  const [processing, setProcessing] = useState({ status: false, message: "" });
  const [token] = useState(searchParams.get("token"));
  useEffect(() => {
    if (token) {
      setProcessing({ status: true, message: "Logging in" });
      localStorage.setItem("jwt", token);
      window.location.href = routeOnSuccess;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).querySelector("input")?.value;
    if (email) {
      setProcessing({ status: true, message: "Sending" });
      await Promise.resolve(
        console.log(`Sending email login link to ${email}...`)
      );
      window.localStorage.setItem("jwt", "1234");
      window.location.href = routeOnSuccess;
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center flex-grow h-full bg-black text-white w-full">
        <section className="flex items-center justify-center w-full">
          {processing.status ? (
            <Loading message={processing.message} />
          ) : (
            <div className="w-full max-w-sm space-y-2">
              <h1 className="text-lg text-gray-400 font-bold">Login</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col h-full space-y-2"
              >
                <input
                  className="p-2 text-gray-700 rounded border text-base"
                  type="email"
                  placeholder="Email"
                />
                <button
                  className="text-base font-bold bg-blue-500 rounded py-2 text-white"
                  type="submit"
                >
                  Email Login Link
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </AuthLayout>
  );
}
