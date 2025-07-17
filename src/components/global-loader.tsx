"use client";

import { useLoader } from "@/context/loader-context";

const GlobalLoader = () => {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="loading-dots flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary"></span>
                <span className="h-3 w-3 rounded-full bg-primary"></span>
                <span className="h-3 w-3 rounded-full bg-primary"></span>
                <span className="h-3 w-3 rounded-full bg-primary"></span>
                <span className="h-3 w-3 rounded-full bg-primary"></span>
            </div>
        </div>
    );
};

export default GlobalLoader;
