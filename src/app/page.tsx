"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThreeDCard from "@/components/three-d-card";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 z-0">
        <ThreeDCard />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 p-4">
        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          ttr gestion
        </h1>
        <p className="max-w-xl text-lg text-neutral-300 md:text-xl">
          La nouvelle ère de la gestion. Simple, sécurisée et intelligente.
        </p>
        <Link href="/login">
          <Button size="lg" className="mt-4">
            Commencer
          </Button>
        </Link>
      </div>
    </main>
  );
}
