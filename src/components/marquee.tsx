"use client";
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

const messages = [
  { text: "La gestion de votre entreprise, désormais dans votre poche." },
  { text: "Pilotez vos finances en temps réel." },
  { text: "Centralisez clients, ventes et stocks sans effort." },
  { text: "L'intelligence au service de chaque métier." },
  { text: "Devenez Ambassadeur TTR Gestion et gagnez de l'argent en ligne !" },
  { text: "Essayez TTR Gestion gratuitement et sans engagement." },
];

export const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="size-4 fill-current shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.604 6.06L0 24l6.104-1.601a11.803 11.803 0 005.942 1.604h.005c6.635 0 12.032-5.396 12.035-12.03a11.785 11.785 0 00-3.526-8.51" />
    </svg>
);

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
        {messages.map((msg, i) => <MarqueeItem key={`p1-${i}`} text={msg.text} />)}
        {messages.map((msg, i) => <MarqueeItem key={`p2-${i}`} text={msg.text} />)}
      </div>
      <div className="absolute top-0 flex shrink-0 items-center whitespace-nowrap animate-marquee2">
         {messages.map((msg, i) => <MarqueeItem key={`p3-${i}`} text={msg.text} />)}
         {messages.map((msg, i) => <MarqueeItem key={`p4-${i}`} text={msg.text} />)}
      </div>
    </div>
  );
};
