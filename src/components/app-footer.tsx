
"use client";

import Link from 'next/link';
import { Youtube, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import AOS from 'aos';
import React, { useEffect } from 'react';
import LoaderLink from './loader-link';

const XIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("size-5", className)}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
        <footer className="w-full py-12 px-4 md:px-8 border-t border-border/20 bg-background">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 text-center">
                <nav data-aos="fade-up" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <LoaderLink href="/about" className="hover:text-foreground transition-colors">À Propos</LoaderLink>
                    <LoaderLink href="/services" className="hover:text-foreground transition-colors">Services</LoaderLink>
                    <LoaderLink href="/support" className="hover:text-foreground transition-colors">Support</LoaderLink>
                    <LoaderLink href="/privacy" className="hover:text-foreground transition-colors">Confidentialité</LoaderLink>
                    <LoaderLink href="/terms" className="hover:text-foreground transition-colors">Conditions</LoaderLink>
                </nav>
                <div data-aos="fade-up" data-aos-delay="100" className="flex justify-center items-center gap-6">
                    <a href="https://www.youtube.com/@ttrgestion" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Youtube className="size-6" />
                    </a>
                    <a href="https://x.com/ttrgestion" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-muted-foreground hover:text-foreground transition-colors">
                        <XIcon />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61578837105446" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Facebook className="size-6" />
                    </a>
                </div>
                <p data-aos="fade-up" data-aos-delay="200" className="text-xs text-muted-foreground">&copy; 2025 TTR GESTION — L’intelligence au service de chaque métier</p>
            </div>
        </footer>
    );
};
