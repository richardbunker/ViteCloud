import { useEffect, useState } from "react";

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

  return (
    <main className="flex-1 h-full flex">
      {activeRoute ? activeRoute.component : <h1>404 - Not Found</h1>}
    </main>
  );
};

export default Router;
