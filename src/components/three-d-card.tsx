"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const ThreeDCard = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="group [perspective:1000px]">
          <div
            className={cn(
              "relative h-[350px] w-[525px] rounded-xl shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)]",
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

            <div className="absolute inset-0 flex items-center justify-center">
                <svg
                    width="60%"
                    viewBox="0 0 400 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                    <style type="text/css">
                        {`
                        .heavy { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 48px; fill: white; letter-spacing: 0.1em; }
                        .light { font-family: 'Space Grotesk', sans-serif; font-weight: 300; font-size: 20px; fill: #CBD5E1; }
                        `}
                    </style>
                    </defs>
                    <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" className="heavy">
                    TTRGESTION
                    </text>
                    <text x="50%" y="75%" dominantBaseline="middle" textAnchor="middle" className="light">
                    .APP
                    </text>
                </svg>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ThreeDCard;
