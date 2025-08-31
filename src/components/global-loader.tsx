"use client";

import { useLoader } from "@/context/loader-context";

const GlobalLoader = () => {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100]">
            <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="loader-spinner"
                >
                <circle cx="12" cy="3" r="1.5" className="dot dot-1" />
                <circle cx="16.5" cy="5.5" r="1.5" className="dot dot-2" />
                <circle cx="18.4" cy="10.5" r="1.5" className="dot dot-3" />
                <circle cx="15" cy="15" r="1.5" className="dot dot-4" />
                <circle cx="10" cy="18.4" r="1.5" className="dot dot-5" />
            </svg>
        </div>
    );
};

export default GlobalLoader;
