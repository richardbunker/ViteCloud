import { Main } from "../page/Main";
import { Header } from "../page/Header";
import { Footer } from "../page/Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <Header />
      {children}
      <Footer />
    </Main>
  );
}
