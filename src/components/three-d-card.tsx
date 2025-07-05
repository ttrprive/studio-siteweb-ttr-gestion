"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const ThreeDCard = () => {
  return (
    <div className="group [perspective:1000px]">
      <div
        className={cn(
          "relative h-[525px] w-[350px] rounded-xl shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)]",
          // Base metallic look
          "bg-slate-800",
          // Gradient for metallic sheen
          "bg-gradient-to-br from-slate-600 via-slate-800 to-slate-900",
          // Border for edge highlight
          "border border-slate-600"
        )}
      >
        {/* Adding an inner shine effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>

        <div className="absolute inset-6 flex flex-col items-center justify-center rounded-lg">
            <h1 className="text-white text-4xl font-bold font-headline tracking-wider">TTRGESTION</h1>
            <p className="text-slate-300 font-body text-lg">.APP</p>
        </div>
      </div>
    </div>
  );
};

export default ThreeDCard;
