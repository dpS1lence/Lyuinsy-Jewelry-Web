import video1 from "../../src/assets/videos/Springvid.mp4";
import { useEffect, useRef } from 'react';

export default function VideoSection3() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            // Set properties programmatically to ensure compatibility
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;

            // Try to play the video programmatically
            const playVideo = async () => {
                try {
                    await video.play();
                } catch (error) {
                    console.error("Video playback failed:", error);
                }
            };

            playVideo();
        }
    }, []);

    return (
        <video 
            ref={videoRef} 
            className="flex w-full h-[30rem] lg:w-full lg:h-[60rem] object-cover lg:object-cover lg:object-center"
            style={{ objectPosition: 'right' }}
            muted 
            autoPlay 
            loop 
            playsInline
        >
            <source src={video1} type="video/mp4" />
            Вашият браузър не поддържа видео таг.
        </video>
    );
};