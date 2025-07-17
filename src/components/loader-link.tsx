"use client";

import { useLoader } from "@/context/loader-context";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type LoaderLinkProps = LinkProps & {
    children: React.ReactNode;
    className?: string;
};

const LoaderLink: React.FC<LoaderLinkProps> = ({ children, href, className, ...props }) => {
    const { startLoading, stopLoading } = useLoader();
    const pathname = usePathname();

    useEffect(() => {
        // This will stop the loader when the page navigation completes
        stopLoading();
    }, [pathname, stopLoading]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Don't start loader if it's the same page
        if (pathname === href.toString()) {
            return;
        }
        startLoading();
    };

    return (
        <Link href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
};

export default LoaderLink;
