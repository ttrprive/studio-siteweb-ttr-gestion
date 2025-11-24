"use client";
import { cn } from '@/lib/utils';

export const Marquee = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={cn("relative flex w-full overflow-hidden bg-primary py-2", className)}>
      <div className="animate-marquee whitespace-nowrap text-primary-foreground">
        <span className="mx-4 text-sm font-semibold">{text}</span>
        <span className="mx-4 text-sm font-semibold">{text}</span>
        <span className="mx-4 text-sm font-semibold">{text}</span>
        <span className="mx-4 text-sm font-semibold">{text}</span>
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap text-primary-foreground">
        <span className="mx-4 text-sm font-semibold">{text}</span>
        <span className="mx-4 text-sm font-semibold">{text}</span>
        <span className="mx-4 text-sm font-semibold">{text}</span>
        <span className="mx-4 text-sm font-semibold">{text}</span>
      </div>
    </div>
  );
};
