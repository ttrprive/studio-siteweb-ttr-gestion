"use client";

// Mettez à jour la source de la vidéo lorsque vous aurez le lien
const videoSrc = "https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4";

export const VideoHero = () => {
    return (
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
            <video
                className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
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
