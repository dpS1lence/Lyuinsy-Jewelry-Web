import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../lib/appwrite";
import ScrollAnimation from "../components/ScrollAnimation";
import { Databases } from "appwrite";

export default function BestSellerSection() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const databases = new Databases();

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

        fetchItems();
    }, []);

    const handleReserveClick = (itemId) => {
        navigate(`/item-purchase-direct/${itemId}`);
    };

    return (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-8">
                <ScrollAnimation>
                    <div className="text-center relative">
                        <span className="text-5xl animate-bounce">🎄</span>
                        <h2 className="text-5xl font-serif mb-6 text-gray-900">Коледни Бестселъри</h2>
                        <p className="text-gray-600 text-xl">
                            <span className="mr-2">✨</span>
                            Създайте магически моменти с нашата изключителна колекция
                            <span className="ml-2">✨</span>
                        </p>
                    </div>

                    <div className="flex items-center justify-center mt-12 mb-12">
                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent w-32"></div>
                        <span className="mx-4 text-2xl">✧</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent w-32"></div>
                    </div>
                </ScrollAnimation>

                <div className="space-y-40">
                    {items.map((item) => (
                        <ScrollAnimation key={item.$id}>
                            <div className="relative">
                                <div className="flex flex-col lg:flex-row items-center lg:gap-20">
                                    <div className="lg:w-3/5">
                                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                            <div className="relative">
                                                <img
                                                    src={item.image} // Assuming `image` holds the image URL
                                                    alt={item.title}
                                                    className="w-full lg:h-[600px] object-cover"
                                                />
                                                <div className="absolute top-6 right-6">
                                                    <span className="bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                                                        ✧ СПЕЦИАЛНА ОФЕРТА ✧
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:w-2/5">
                                        <h2 className="text-4xl font-serif mb-8">{item.name}</h2>
                                        <div className="space-y-6 mb-12">
                                            <p className="text-gray-600 text-lg leading-relaxed">
                                                {item.description}
                                            </p>
                                            <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-8">
                                                {item.bulletsDescription.map((feature, index) => (
                                                    <li key={index}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex flex-col lg:flex-row justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-4xl font-light line-through text-gray-400">
                                                        {item.oldPrice}лв
                                                    </span>
                                                    <span className="text-4xl font-bold text-emerald-700">
                                                        {item.actualPrice}лв
                                                    </span>
                                                </div>
                                                <span className="text-emerald-700">{`★★★★★`}</span>
                                            </div>
                                            <div className="text-sm text-emerald-700 font-semibold">
                                                item.offerDetails
                                            </div>
                                            <div className="flex justify-center items-center text-center">
                                                <button
                                                    onClick={() => handleReserveClick(item.$id)}
                                                    className="w-full md:w-3/4 bg-emerald-700 text-white py-4 rounded-full hover:bg-emerald-800 transition"
                                                >
                                                    Резервирай сега за Коледа
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}

