
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, Sparkles, TrendingUp } from "lucide-react";

export const AmbassadorModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const lastSeen = localStorage.getItem('lastSeenAmbassadorModal');
            const now = Date.now();
            const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

            if (!lastSeen || (now - parseInt(lastSeen)) > thirtyDaysInMs) {
                setIsOpen(true);
                localStorage.setItem('lastSeenAmbassadorModal', now.toString());
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[500px] border-amber-200 dark:border-amber-900 shadow-2xl">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-amber-500 p-4 rounded-full shadow-lg animate-bounce">
                    <Coins className="size-8 text-white" />
                </div>
                
                <DialogHeader className="pt-8">
                    <DialogTitle className="text-3xl font-black text-center bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                        DEVENEZ AMBASSADEUR TTR !
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg mt-4 font-medium text-foreground">
                        Rejoignez notre programme et commencez à gagner de l'argent en ligne dès aujourd'hui.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/50">
                        <TrendingUp className="size-5 text-amber-600 shrink-0 mt-1" />
                        <p className="text-sm">Gagnez des commissions sur chaque recommandation réussie.</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/50">
                        <Sparkles className="size-5 text-blue-600 shrink-0 mt-1" />
                        <p className="text-sm">Accès à un tableau de bord dédié pour suivre vos gains en temps réel.</p>
                    </div>
                </div>

                <DialogFooter className="sm:justify-center gap-2">
                    <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold h-14 text-lg shadow-lg shadow-amber-500/20"
                        asChild
                    >
                        <a href="https://ambassadeur.ttrgestion.site/" target="_blank" rel="noopener noreferrer">
                            JE REJOINS LE PROGRAMME 💰
                        </a>
                    </Button>
                </DialogFooter>

                <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    OFFRE LIMITÉE • INSCRIPTION GRATUITE
                </p>
            </DialogContent>
        </Dialog>
    );
};
