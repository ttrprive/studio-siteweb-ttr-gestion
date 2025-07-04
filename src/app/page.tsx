"use client";

import { useEffect, useRef } from "react";
import ThreeDCard from "@/components/three-d-card";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (mainRef.current) {
        const { clientX, clientY } = event;
        const rect = mainRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        mainRef.current.style.setProperty("--mouse-x", `${x}px`);
        mainRef.current.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="dynamic-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative h-80 w-full max-w-xl md:h-96">
        <ThreeDCard />
      </div>
    </main>
  );
}
