import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../lib/appwrite";
import ScrollAnimation from "../components/ScrollAnimation";
import { Databases } from "appwrite";
import pearl from "../../src/assets/images/prearl6.png"
import video1 from "../../src/assets/videos/7.mp4"
import video2 from "../../src/assets/videos/3.mp4"

export default function BestSellerSection() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const databases = new Databases();
    const videoRef = useRef(null);

    useEffect(() => {
        // Fetch items from Appwrite
        const fetchItems = async () => {
            try {
                const itemsFetch = await getAllItems();
                const filteredItems = itemsFetch.filter(item => item['specialOffer']);
                setItems(filteredItems.slice(0, 3)); // Get first 3 items with special-offer = true
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        const ensureVideoPlayback = async () => {
            const video = videoRef.current;

            if (video) {
                // Set properties programmatically
                video.muted = true;
                video.autoplay = true;
                video.loop = true;
                video.playsInline = true;

                // Try to play the video programmatically
                try {
                    await video.play();
                } catch (error) {
                    console.error("Video playback failed:", error);
                }
            }
        };

        ensureVideoPlayback();
        fetchItems();
    }, []);

    const handleReserveClick = (itemId) => {
        navigate(`/item-purchase-direct/${itemId}`);
    };

    const learnmore = () => {
        navigate(`/collections`);
    };

    return (
    <div className="bg-background">
        <div className="text-center relative bg-accentbackground py-20">
            <h2 className="text-5xl font-serif mb-6 text-text">Специални предложения</h2>
            <p className="text-text text-xl">
                Открийте нашата изключителна колекция, която ще ви помогне да създадете незабравими моменти и да изразите своята любов по уникален начин.
            </p>
        </div>
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
                    <source src={videoSrc} type="video/mp4" />
                    Вашият браузър не поддържа видео таг.
                </video>
            </div>
            <div className="lg:w-1/2 lg:pl-32 p-8 flex flex-col justify-center items-start">
                <h2 className="text-3xl font-serif mb-2">Елегантността на перлите</h2>
                <p className="text-lg text-text leading-relaxed">
                    Перлите символизират изящество и женственост.
                </p>
                <button onClick={learnmore} className="lg:bg-black lg:border border-black lg:text-white px-4 py-2 mt-16 transition-colors hover:bg-white hover:text-black">
                    Научете повече
                </button>
            </div>
        </div>
        <div className="bg-white flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-1/2">
                <video className="w-full h-full object-cover" autoPlay loop muted>
                    <source src={video2} type="video/mp4" />
                    Вашият браузър не поддържа видео таг.
                </video>
            </div>
            <div className="lg:w-1/2 p-8 lg:pl-32 flex flex-col justify-center items-start">
                <h2 className="text-4xl font-serif mb-4">Изразете своя стил</h2>
                <p className="text-lg text-text leading-relaxed">
                    Нашата колекция от бижута е създ на всеки момент.
                </p>
                <button onClick={learnmore} className="bg-black border border-black text-white px-4 py-2 mt-4 transition-colors hover:bg-white hover:text-black">
                    Научете повече
                </button>
            </div>
        </div>
        <div className="text-center relative bg-accentbackground py-20">
            <h2 className="text-5xl font-serif mb-6 text-text">Специални предложения</h2>
            <p className="text-text text-xl">
                Открийте нашата изключителна колекция, която ще ви помогне да създадете незабравими моменти и да изразите своята любов по уникален начин.
            </p>
        </div>
        <div className="container mx-auto px-8 pt-10">
            <div className="space-y-10">
                {items.map((item) => (
                    <ScrollAnimation key={item.$id}>
                        <div className="relative">
                            <div className="flex flex-col bg-background lg:flex-row items-center">
                                <div className="lg:w-3/5">
                                    <div className="bg-background shadow-sm overflow-hidden lg:pb-24 lg:px-20">
                                        <div className="relative">
                                            <img
                                                src={item.image} // Assuming `image` holds the image URL
                                                alt={item.title}
                                                className={`w-full lg:h-[600px] object-cover ${item.quantity === 0 ? 'filter grayscale' : ''}`}
                                            />
                                            {item.quantity === 0 && (
                                                <div className="absolute inset-0 bg-accentbackground opacity-50 flex items-center justify-center">
                                                    <span className="text-black text-6xl font-bold">Изчерпана</span>
                                                </div>
                                            )}
                                            <div className="absolute top-6 right-6">
                                                <span className="bg-discount text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                                                    СПЕЦИАЛНА ОФЕРТА
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-background lg:w-2/5 h-full lg:py-24 lg:px-20 py-10 px-10">
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-4xl font-serif mb-8">{item.name}</h2>
                                        <div className="space-y-6 mb-12">
                                            <p className="text-text text-lg leading-relaxed">
                                                {item.description}
                                            </p>
                                            <ul className="text-text text-lg leading-relaxed list-disc pl-8">
                                                {item.bulletsDescription.map((feature, index) => (
                                                    <li key={index}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex flex-col lg:flex-row justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-4xl font-light line-through text-gray-400">
                                                        {item.oldPrice.toFixed(2)}лв
                                                    </span>
                                                    <span className="text-4xl font-bold text-main">
                                                        {item.actualPrice.toFixed(2)}лв
                                                    </span>
                                                </div>
                                                <span className="text-main">{`★★★★★`}</span>
                                            </div>
                                            <div className="flex justify-center items-center text-center">
                                                <button
                                                    onClick={() => handleReserveClick(item.$id)}
                                                    className={`bg-black text-white border border-black px-8 py-4 font-medium w-full lg:w-auto hover:bg-white hover:text-black transition ${item.quantity === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                                    disabled={item.quantity === 0}
                                                >
                                                    Резервирай сега за Свети Валентин
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                ))}
            </div>
        </div>
        </div>
    );
}
