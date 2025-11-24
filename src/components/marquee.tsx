"use client";
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const messages = [
  "La gestion de votre entreprise, désormais dans votre poche.",
  "Pilotez vos finances en temps réel.",
  "Centralisez clients, ventes et stocks sans effort.",
  "L'intelligence au service de chaque métier.",
  "Essayez TTR Gestion gratuitement et sans engagement.",
];

const MarqueeItem = ({ text }: { text: string }) => (
    <div className="mx-4 flex items-center gap-3">
        <Sparkles className="size-4 text-background/80 shrink-0" />
        <span className="text-sm font-semibold">{text}</span>
    </div>
);

export const Marquee = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex w-full overflow-hidden bg-primary py-2 text-primary-foreground", className)}>
      <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap">
        {messages.map((msg, i) => <MarqueeItem key={`p1-${i}`} text={msg} />)}
        {messages.map((msg, i) => <MarqueeItem key={`p2-${i}`} text={msg} />)}
      </div>
      <div className="absolute top-0 flex shrink-0 items-center whitespace-nowrap animate-marquee2">
         {messages.map((msg, i) => <MarqueeItem key={`p3-${i}`} text={msg} />)}
         {messages.map((msg, i) => <MarqueeItem key={`p4-${i}`} text={msg} />)}
      </div>
    </div>
  );
};
