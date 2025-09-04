"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getSupportMessages, updateSupportMessageReadStatus } from '@/firebase/services';
import type { SupportMessage } from '@/types/support';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import { Mail, MailOpen, Sparkles } from 'lucide-react';

const AdminSupportManager = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        setLoading(true);
        const supportMessages = await getSupportMessages();
        setMessages(supportMessages);
        setLoading(false);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent accordion from toggling
        try {
            await updateSupportMessageReadStatus(id, true);
            toast({
                title: "Succès",
                description: "Le message a été marqué comme lu.",
            });
            await fetchMessages();
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour le message.",
                variant: "destructive",
            });
        }
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Messagerie de Support</span>
                    {unreadCount > 0 && <Badge variant="destructive">{unreadCount} non lu(s)</Badge>}
                </CardTitle>
                <CardDescription>Consultez les messages envoyés depuis le site.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                {loading ? (
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
                    </div>
                ) : messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Aucun message dans la boîte de réception.</p>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {messages.map(msg => {
                            const isServiceRequest = msg.subject.startsWith('Demande de service:');
                            return (
                                <AccordionItem value={msg.id} key={msg.id} className={!msg.read ? 'border-primary/50' : ''}>
                                    <AccordionTrigger>
                                        <div className="flex items-center justify-between w-full pr-4">
                                            <div className="flex items-center gap-4">
                                                {isServiceRequest ? (
                                                     <Sparkles className={`size-5 ${!msg.read ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                                                ) : (
                                                    !msg.read ? <Mail className="size-5 text-primary" /> : <MailOpen className="size-5 text-muted-foreground" />
                                                )}
                                                <div className="text-left">
                                                    <p className={`font-semibold ${!msg.read ? 'text-foreground' : 'text-muted-foreground'}`}>{msg.subject}</p>
                                                    <p className="text-sm text-muted-foreground">{msg.name} &lt;{msg.email}&gt;</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-xs text-muted-foreground">
                                                    {formatDistanceToNow(new Date(msg.createdAt.seconds * 1000), { addSuffix: true, locale: fr })}
                                                </span>
                                                {!msg.read && <Badge variant="secondary">Nouveau</Badge>}
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-muted/50 rounded-md">
                                            <p>{msg.message}</p>
                                        </div>
                                        {!msg.read && (
                                            <div className="mt-4 flex justify-end">
                                                <Button size="sm" onClick={(e) => handleMarkAsRead(msg.id, e)}>
                                                    Marquer comme lu
                                                </Button>
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                )}
            </CardContent>
        </Card>
    );
};

export default AdminSupportManager;
