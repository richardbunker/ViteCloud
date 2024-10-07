import { useEffect, useState } from "react";
import { Error404 } from "./pages/error/404";

export interface Route {
  path: string;
  requiresAuth?: boolean;
  component: JSX.Element;
}

interface RouterProps {
  routes: Route[];
}

const Router = ({ routes }: RouterProps) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const activeRoute = routes.find((route) => route.path === currentPath);
  if (activeRoute && activeRoute.requiresAuth) {
    if (!window.localStorage.getItem("jwt")) {
      window.location.href = "/login";
      return null;
    }
  }

  return activeRoute ? activeRoute.component : <Error404 />;
};

export default Router;
