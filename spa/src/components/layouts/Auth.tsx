import { Main } from "../page/Main";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Main>{children}</Main>;
}
