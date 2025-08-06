
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getNewsBadgeStatus, setNewsBadgeStatus } from '@/firebase/services';
import { Skeleton } from './ui/skeleton';

const AdminSettingsManager = () => {
    const { toast } = useToast();
    const [showBadge, setShowBadge] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            setLoading(true);
            const status = await getNewsBadgeStatus();
            setShowBadge(status);
            setLoading(false);
        };
        fetchStatus();
    }, []);

    const handleToggle = async (checked: boolean) => {
        setShowBadge(checked);
        try {
            await setNewsBadgeStatus(checked);
            toast({
                title: "Succès",
                description: `Le badge "Nouveau" est maintenant ${checked ? 'activé' : 'désactivé'}.`,
            });
        } catch (error) {
            setShowBadge(!checked); // Revert on error
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour le paramètre.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Paramètres Généraux du Site</CardTitle>
                <CardDescription>Contrôlez divers éléments interactifs du site.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="news-badge-toggle"
                            checked={showBadge}
                            onCheckedChange={handleToggle}
                        />
                        <Label htmlFor="news-badge-toggle">Afficher le badge "Nouveau" sur l'actualité</Label>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AdminSettingsManager;
