import video1 from "../../src/assets/videos/3.mp4";
import { useNavigate } from "react-router";
import { useEffect, useRef } from 'react';

export default function VideoSection() {
    const navigate = useNavigate();
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

    const learnmore = () => {
        navigate(`/collections`);
    };

    return (
        <div className="bg-white flex flex-col lg:flex-row-reverse items-stretch">
            <div className="lg:w-1/2">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                >
                    <source src={video1} type="video/mp4" />
                    Вашият браузър не поддържа видео таг.
                </video>
            </div>
            <div className="lg:w-1/2 lg:pl-32 p-8 flex flex-col justify-center items-start">
            <h2 className="text-3xl font-serif mb-2">Перлите: Символ на вечната красота</h2>
                <p className="text-lg text-text leading-relaxed">
                    Перлите са не само бижута, но и израз на елегантност и стил, които никога не излизат от мода.
                </p>
                <button onClick={learnmore} className="bg-black border border-black text-white px-4 py-2 mt-16 transition-colors hover:bg-white hover:text-black">
                    Научете повече
                </button>
            </div>
        </div>
    );
};