export function Footer() {
  const year = new Date().getFullYear();
  return (
    <header className="h-16 px-4 bg-black text-white flex items-center justify-center">
      &copy; {year} Richard Bunker
    </header>
  );
}
