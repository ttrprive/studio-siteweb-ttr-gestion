"use client";

import ThreeDCard from "@/components/three-d-card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {/* Enhanced background light orb */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute size-[400px] rounded-full bg-blue-500/30 blur-[150px]" />
      </div>
      <div className="relative z-10">
        <ThreeDCard />
      </div>
    </main>
  );
}
