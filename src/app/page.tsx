"use client";

import ThreeDCard from "@/components/three-d-card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute h-[32rem] w-[32rem] rounded-full bg-blue-400/60 blur-3xl animate-pulse" />
      <div className="relative z-10">
        <ThreeDCard />
      </div>
    </main>
  );
}
