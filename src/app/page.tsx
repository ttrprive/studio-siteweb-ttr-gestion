"use client";

import ThreeDCard from "@/components/three-d-card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ThreeDCard />
      </div>
    </main>
  );
}
