
"use client";

import React, { useState } from 'react';
import { Monitor, Smartphone, Apple, Globe, Download, CheckCircle, Sparkles, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const platforms = [
  {
    id: 'android',
    name: 'Android (APK)',
    icon: Smartphone,
    available: true,
    description: 'Installation APK directe',
    url: '/ttr-gestion.apk'
  },
  {
    id: 'playstore',
    name: 'Play Store',
    icon: PlayCircle,
    available: false,
    description: 'Bientôt sur le store Google',
    url: '#'
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: Monitor,
    available: false,
    description: 'Bientôt disponible sur PC',
    url: '#'
  },
  {
    id: 'ios',
    name: 'App Store (iOS)',
    icon: Apple,
    available: false,
    description: 'Bientôt sur iPhone & iPad',
    url: '#'
  },
  {
    id: 'web',
    name: 'Web / PWA',
    icon: Globe,
    available: true,
    description: 'Utiliser en ligne',
    url: 'https://app.ttrgestion.site'
  }
];

export const DownloadHero = () => {
    const [selectedId, setSelectedId] = useState('android');
    const [showAlert, setShowAlert] = useState(false);

    const selectedPlatform = platforms.find(p => p.id === selectedId);

    const handleDownloadClick = (e: React.MouseEvent) => {
        if (!selectedPlatform?.available) {
            e.preventDefault();
            setShowAlert(true);
        }
    };

    return (
        <section className="relative w-full bg-background text-foreground pt-20 pb-28 overflow-hidden border-b">
            {/* Background elements - Adaptive theme effects */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/[0.03] dark:bg-blue-500/[0.07] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-cyan-500/[0.03] dark:bg-cyan-500/[0.07] blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] dark:opacity-[0.08] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, currentColor 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Platform selector row - Premium design adaptive */}
                <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto mb-16 animate-fade-in">
                    {platforms.map((platform) => (
                        <button
                            key={platform.id}
                            onClick={() => setSelectedId(platform.id)}
                            className={cn(
                                "group relative flex items-center gap-3 p-3 px-5 rounded-xl transition-all duration-300 border",
                                selectedId === platform.id 
                                    ? "bg-white dark:bg-slate-900 border-blue-500/30 shadow-lg shadow-blue-500/5 translate-y-[-2px]" 
                                    : "bg-muted/30 dark:bg-slate-900/40 border-transparent hover:border-blue-500/10 hover:bg-muted/50",
                                !platform.available && "grayscale opacity-40 cursor-not-allowed"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg transition-colors",
                                selectedId === platform.id ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                            )}>
                                <platform.icon className="size-5 md:size-6" />
                            </div>
                            
                            <div className="text-left">
                                <span className={cn(
                                    "block text-sm md:text-base font-bold transition-colors leading-tight",
                                    selectedId === platform.id ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {platform.name}
                                </span>
                                <span className="text-[8px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold block">
                                    {platform.available ? (platform.id === 'android' ? 'Favori' : 'Disponible') : 'Demain'}
                                </span>
                            </div>

                            {selectedId === platform.id && (
                                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 animate-fade-in shadow-sm">
                        <Sparkles className="size-4" />
                        <span>L'application de gestion tout-en-un, désormais dans votre poche</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-headline mb-8 tracking-tighter leading-none text-foreground">
                        TTR GESTION sur <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">{selectedPlatform?.id === 'android' ? 'Android.' : selectedPlatform?.name + '.'}</span>
                    </h1>
                    
                    <div className="flex flex-col items-center gap-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 rounded-xl blur opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                            <Button 
                                size="lg" 
                                className="relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-2xl py-12 px-14 rounded-xl transition-all active:scale-95 shadow-xl shadow-blue-500/10 border border-white/10 dark:border-white/5"
                                onClick={handleDownloadClick}
                                asChild
                            >
                                <a 
                                    href={selectedPlatform?.available ? selectedPlatform.url : "#"} 
                                    target={selectedPlatform?.id === 'web' ? "_blank" : undefined}
                                    download={selectedPlatform?.id === 'android' ? "ttr-gestion-v021.apk" : (selectedPlatform?.id === 'windows' ? "ttr-gestion.exe" : undefined)}
                                >
                                    {selectedPlatform?.id === 'web' ? <Globe className="mr-3 h-8 w-8" /> : <Download className="mr-3 h-8 w-8" />}
                                    {selectedPlatform?.id === 'web' ? 'Accéder en ligne' : (selectedPlatform?.id === 'android' ? "Télécharger l'APK direct" : 'Télécharger maintenant')}
                                </a>
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase font-bold">STABLE v0.2.1 • 100% SÉCURISÉ</span>
                            <div className="flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 bg-green-500/5 dark:bg-green-500/10 border border-green-500/10 dark:border-green-500/20 rounded-full shadow-inner">
                                <CheckCircle className="size-5 md:size-6 text-green-500" />
                                <span className="text-2xl md:text-3xl lg:text-4xl font-black text-green-600 dark:text-green-500 tracking-[0.1em] animate-pulse">C'EST GRATUIT</span>
                            </div>
                        </div>
                    </div>
                    
                    <p className="mt-12 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed font-medium">
                        Rejoignez des dizaines d'entrepreneurs dès aujourd'hui. 
                        Régis par nos <Link href="/terms" className="text-blue-500 dark:text-blue-400 hover:underline">Conditions</Link> 
                        et notre <Link href="/privacy" className="text-blue-500 dark:text-blue-400 hover:underline">Confidentialité</Link>.
                    </p>
                </div>
            </div>
            
            {/* Availability Alert adaptive */}
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent className="bg-background border-border text-foreground shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold">Plateforme en préparation 🚀</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground text-base">
                            La version pour <strong>{selectedPlatform?.name}</strong> est actuellement en phase finale de développement et sera bientôt disponible sur les stores officiels.
                            <br /><br />
                            En attendant, vous pouvez utiliser la version <strong>APK Direct</strong> sur Android ou continuer via votre <strong>Navigateur</strong>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        {selectedPlatform?.id === 'windows' || selectedPlatform?.id === 'ios' ? (
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400"
                                asChild
                            >
                                <a href="https://app.ttrgestion.site" target="_blank">Accéder à la version Web</a>
                            </Button>
                        ) : (
                            <Button 
                                variant="outline" 
                                className="w-full sm:w-auto border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400"
                                asChild
                            >
                                <a href="/ttr-gestion.apk" download="ttr-gestion-v021.apk">Télécharger l'APK (Direct)</a>
                            </Button>
                        )}
                        <AlertDialogAction className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8">D'accord, j'ai compris</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};
