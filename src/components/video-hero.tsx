"use client";

// Mettez à jour la source de la vidéo lorsque vous aurez le lien
const videoSrc = "https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4";

export const VideoHero = () => {
    return (
        <div className="relative w-full max-w-6xl mx-auto aspect-video overflow-hidden rounded-lg shadow-2xl">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                poster="/P8.png" // Image de secours
            >
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
};
