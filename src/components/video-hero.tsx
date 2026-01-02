
"use client";

export const VideoHero = () => {
    // Ajout des paramètres pour une meilleure intégration :
    // autoplay=1 : tente de lancer la vidéo automatiquement
    // loop=1 & playlist=... : astuce pour faire boucler une vidéo YouTube
    // controls=0 : masque les contrôles du lecteur
    // showinfo=0 : masque le titre et autres informations
    const videoSrc = "https://www.youtube.com/embed/qMX-2-FBv_c?si=JNAP-2Xv3vEb14kG&autoplay=1&loop=1&playlist=qMX-2-FBv_c&controls=0&showinfo=0";

    return (
        <div className="relative w-full max-w-6xl mx-auto aspect-video overflow-hidden rounded-lg shadow-2xl">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};
