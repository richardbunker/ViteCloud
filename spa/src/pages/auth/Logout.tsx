export function Logout() {
  localStorage.removeItem("jwt");
  window.location.href = "/login";
  return null;
}
