import { Login } from "./pages/auth/Login";
import { Logout } from "./pages/auth/Logout";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import Router, { Route } from "./Router";
const App = () => {
  const routes: Route[] = [
    { path: "/", component: <Landing /> },
    { path: "/home", component: <Home />, requiresAuth: true },
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    { path: "/logout", component: <Logout />, requiresAuth: true },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <nav className="w-full bg-black h-16 text-white flex items-center justify-end space-x-2 px-4">
        {window.localStorage.getItem("jwt") ? (
          <>
            <a href="/logout">Logout</a>
          </>
        ) : (
          <>
            {" "}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>
      <Router routes={routes} />
    </div>
  );
};

export default App;
