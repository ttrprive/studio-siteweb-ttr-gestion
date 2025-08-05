
"use client";

import Link from 'next/link';
import { Youtube, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import AOS from 'aos';
import React, { useEffect } from 'react';

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("size-6", className)}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.33.36-1.74 1.25-3.33 2.8-4.37.91-.6 1.97-.95 3.02-1.01.03-2.17 0-4.34 0-6.51 0-.36.01-.72.04-1.08.08-1.03.49-2.02 1.2-2.82.91-1.01 2.12-1.51 3.48-1.54Z" />
  </svg>
);

export const AppFooter = () => {
    useEffect(() => {
        AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
        });
    }, []);

    return (
        <footer className="w-full py-10 px-4 md:px-8 border-t border-border/20 bg-background">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
                <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center items-center gap-6">
                    <a href="#" aria-label="Youtube" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Youtube className="size-6" />
                    </a>
                    <a href="#" aria-label="Tiktok" className="text-muted-foreground hover:text-foreground transition-colors">
                        <TiktokIcon />
                    </a>
                    <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Facebook className="size-6" />
                    </a>
                </div>
                <p data-aos="fade-up" data-aos-delay="200" className="text-xs text-muted-foreground">&copy; 2025 TTR GESTION — L’intelligence au service de chaque métier</p>
            </div>
        </footer>
    );
};
