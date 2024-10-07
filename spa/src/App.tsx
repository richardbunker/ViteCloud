import { LoginPage } from "./pages/auth/Login";
import { LogoutPage } from "./pages/auth/Logout";
import { RegisterPage } from "./pages/auth/Register";
import { HomePage } from "./pages/Home";
import { LandingPage } from "./pages/Landing";
import Router, { Route } from "./Router";

export default function App() {
  // Define the routes for the SPA
  const routes: Route[] = [
    { path: "/", component: <LandingPage /> },
    { path: "/home", component: <HomePage />, requiresAuth: true },
    { path: "/login", component: <LoginPage routeOnSuccess="/home" /> },
    { path: "/register", component: <RegisterPage /> },
    { path: "/logout", component: <LogoutPage />, requiresAuth: true },
  ];

  return <Router routes={routes} />;
}
