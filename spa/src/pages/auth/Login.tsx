import { useEffect, useState } from "react";
export function Login() {
  const searchParams = new URLSearchParams(window.location.search);
  const [token] = useState(searchParams.get("token"));
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt", token);
      window.location.href = "/home";
    }
  }, []);

  return (
    <section className="p-8 bg-gray-200 flex-grow">
      {token ? (
        <div className="flex items-center justify-center h-full">
          Processing...
        </div>
      ) : (
        <div>
          <LoginForm />
        </div>
      )}
    </section>
  );
}

function LoginForm() {
  return (
    <div className="p-2 bg-white max-w-md mx-auto rounded space-y-4">
      <h1 className="text-lg font-bold">Login</h1>
      <form className="flex flex-col h-full space-y-2">
        <input className="p-1 border" type="email" placeholder="Email" />
        <button
          className="text-sm font-bold bg-blue-500 rounded py-1 px-2 text-white"
          type="submit"
        >
          Email Login Link
        </button>
      </form>
    </div>
  );
}
