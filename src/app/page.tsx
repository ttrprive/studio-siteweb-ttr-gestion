"use client";

import ThreeDCard from "@/components/three-d-card";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative h-80 w-full max-w-xl md:h-96">
        <ThreeDCard />
      </div>
    </main>
  );
}
