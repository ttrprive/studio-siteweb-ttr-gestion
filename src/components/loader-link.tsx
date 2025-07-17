"use client";

import { useLoader } from "@/context/loader-context";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useCallback, MouseEvent } from "react";

type LoaderLinkProps = LinkProps & {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const LoaderLink: React.FC<LoaderLinkProps> = ({ children, href, className, onClick, ...props }) => {
    const { startLoading, stopLoading } = useLoader();
    const pathname = usePathname();

    const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            onClick(e);
        }
        if (href.toString() !== pathname) {
            startLoading();
        }
    }, [href, pathname, startLoading, onClick]);

    useEffect(() => {
        // Stop loading whenever the pathname changes
        stopLoading();
    }, [pathname, stopLoading]);
    
    return (
        <Link href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
};

export default LoaderLink;
