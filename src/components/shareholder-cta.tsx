
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';
import LoaderLink from './loader-link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const ShareholderCta = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
       <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon" className="rounded-full h-14 w-14 shadow-lg animate-pulse bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500">
                <LoaderLink href="/shareholder" aria-label="Devenir actionnaire">
                    <Handshake className="h-7 w-7" />
                </LoaderLink>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Devenir actionnaire</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ShareholderCta;
