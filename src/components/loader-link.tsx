
"use client";

import { useLoader } from "@/context/loader-context";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useCallback, MouseEvent, forwardRef, Ref } from "react";

type LoaderLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const LoaderLink = forwardRef<HTMLAnchorElement, LoaderLinkProps>(
    ({ children, href, className, onClick, ...props }, ref) => {
        const { startLoading, stopLoading } = useLoader();
        const pathname = usePathname();

        const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
            if (onClick) {
                onClick(e);
            }
            // Only show loader if navigating to a different page
            if (href.toString() !== pathname) {
                startLoading();
            }
        }, [href, pathname, startLoading, onClick]);

        useEffect(() => {
            // Stop loading whenever the pathname changes
            stopLoading();
        }, [pathname, stopLoading]);
        
        return (
            <Link href={href} onClick={handleClick} className={className} {...props} ref={ref}>
                {children}
            </Link>
        );
    }
);

LoaderLink.displayName = "LoaderLink";

export default LoaderLink;
