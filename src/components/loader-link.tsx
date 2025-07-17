"use client";

import { useLoader } from "@/context/loader-context";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useCallback } from "react";

type LoaderLinkProps = LinkProps & {
    children: React.ReactNode;
    className?: string;
};

const LoaderLink: React.FC<LoaderLinkProps> = ({ children, href, className, ...props }) => {
    const { startLoading, stopLoading } = useLoader();
    const pathname = usePathname();

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== href.toString()) {
            startLoading();
        }
    }, [pathname, href, startLoading]);

    useEffect(() => {
        stopLoading();
    }, [pathname, stopLoading]);
    
    return (
        <Link href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
};

export default LoaderLink;
