import { Authenticated } from "../auth/Authenticated";

export function Header() {
  return (
    <header className="h-16 px-4 bg-black text-white flex items-center justify-end">
      <ol className="flex gap-4">
        {Authenticated() ? (
          <li>
            <a href="/logout">Logout</a>
          </li>
        ) : (
          <>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </>
        )}
      </ol>
    </header>
  );
}
