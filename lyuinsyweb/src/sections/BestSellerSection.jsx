import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Changed from useNavigate to Link
import { getAllItems } from "../lib/appwrite";
import ScrollAnimation from "../components/ScrollAnimation";
import { Databases } from "appwrite";
import pearl from "../../src/assets/images/prearl6.png"
import video1 from "../../src/assets/videos/7.mp4"
import video2 from "../../src/assets/videos/3.mp4"

export default function BestSellerSection() {
    const [items, setItems] = useState([]);
    const databases = new Databases();
    const videoRef = useRef(null);

    useEffect(() => {
        // Fetch items from Appwrite
        const fetchItems = async () => {
            try {
                const itemsFetch = await getAllItems();
                const filteredItems = itemsFetch.filter(item => item['specialOffer']);
                setItems(filteredItems.slice(0, 1)); // Get first 3 items with special-offer = true
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

    return (
    <div className="bg-background mb-10">
        <div className="text-left relative bg-gradient-to-r from-accentbackground to-accentbackground-light py-20">
            <div className="mx-auto px-4 container">
                <h2 className="text-5xl font-serif mb-6 text-text">Специални предложения</h2>
                <p className="text-text text-xl">
                    Открийте нашата изключителна колекция, която ще ви помогне да създадете незабравими моменти и да изразите своята любов по уникален начин.
                </p>
            </div>
        </div>
        <div className="container mx-auto px-4 pt-10">
            <div className="space-y-10">
                {items.map((item) => (
                    <div className="relative" key={item.$id}>
                        <div className="flex flex-col bg-background lg:flex-row items-center">
                            <div className="lg:w-3/5">
                                <div className="bg-background shadow-sm overflow-hidden">
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
                            <div className="bg-background lg:w-2/5 h-full lg:py-24 lg:pl-10 py-10">
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
                                            <Link
                                                to={`/item/${item.slug}`}
                                                className={`bg-black text-white border border-black px-8 py-4 font-medium w-full lg:w-auto hover:bg-white hover:text-black transition ${item.quantity === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                            >
                                                Резервирай сега за Свети Валентин
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
