
"use client";

import { cn } from "@/lib/utils";

export const BlueBlob = ({ className }: { className?: string }) => (
    <div className={cn("absolute -z-10 opacity-30 dark:opacity-20", className)}>
        <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-float-slow"
        >
            <g filter="url(#filter0_f_303_4)">
                <path
                    d="M300 161.163C300 220.332 232.843 259.907 161.163 259.907C89.4828 259.907 40 200.332 40 161.163C40 121.993 119.483 40 191.163 40C262.843 40 300 101.993 300 161.163Z"
                    fill="hsl(var(--primary))"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_303_4"
                    x="-60"
                    y="-60"
                    width="460"
                    height="419.907"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="50"
                        result="effect1_foregroundBlur_303_4"
                    />
                </filter>
            </defs>
        </svg>
    </div>
);

export const WhiteBlob = ({ className }: { className?: string }) => (
    <div className={cn("absolute -z-10 opacity-20 dark:opacity-10", className)}>
         <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-float-slow-delay"
        >
            <g filter="url(#filter0_f_303_5)">
                <path
                    d="M259.907 140C319.076 140 359.907 207.157 359.907 278.837C359.907 350.517 299.076 400 259.907 400C188.227 400 100 320.517 100 248.837C100 177.157 200.738 140 259.907 140Z"
                    fill="hsl(var(--foreground))"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_303_5"
                    x="0"
                    y="40"
                    width="459.907"
                    height="460"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="50"
                        result="effect1_foregroundBlur_303_5"
                    />
                </filter>
            </defs>
        </svg>
    </div>
);
