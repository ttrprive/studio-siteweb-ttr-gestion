"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ThreeDCard from "@/components/three-d-card";
import { ArrowRight, Zap } from 'lucide-react';
import Link from "next/link";

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
      className="dynamic-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-8 text-center"
    >
      <div className="z-10 flex flex-col items-center">
        <div className="mb-4 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
          <Zap className="h-4 w-4 text-accent" />
          <span>Une carte 3D interactive</span>
        </div>
        <h1 className="font-headline text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 md:text-7xl">
          ttrgestion.app
        </h1>
        <p className="font-body mt-6 max-w-2xl text-lg text-foreground/70">
          Explorez la nouvelle ère de la gestion avec notre interface innovante. Une expérience premium pour des résultats exceptionnels.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="font-bold">
              Commencer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="font-bold bg-transparent">
            En savoir plus
          </Button>
        </div>
      </div>
      <div className="relative mt-12 h-64 w-full max-w-md md:h-80 lg:mt-20">
        <ThreeDCard />
      </div>
    </main>
  );
}
