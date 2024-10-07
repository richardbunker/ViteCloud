export function Authenticated() {
  const jwt = localStorage.getItem("jwt");
  return jwt ?? null;
}
