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
        stopLoading();
    }, [pathname, stopLoading]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== href) {
            startLoading();
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
};

export default LoaderLink;
