import { useState, useEffect } from "react";

export function Loading({ message }: { message?: string }) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 4 ? prev + "." : "."));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[100px]">
      <h1 className="absolute min-w-max inset-0 text-2xl">
        {message ?? `Loading`}
        {dots}
      </h1>
    </div>
  );
}
