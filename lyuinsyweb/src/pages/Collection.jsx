import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollAnimation from "../components/ScrollAnimation";

const Collection = ({ collections }) => {
    const { id } = useParams(); // Get the ID from the URL
    const collection = collections.find(col => col.id === parseInt(id)); // Find the collection by ID

    if (!collection) {
        return <div>Collection not found</div>; // Handle case where collection is not found
    }

    const items = collection.items; // Assuming collection has an items array

    const handleReserveClick = (item) => {
        // Handle the reserve action here
        console.log(`Reserved: ${item.title}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
      }, []);

    return (
        
    <ScrollAnimation>
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 relative">
                    <h2 className="text-3xl font-serif mb-4">{collection.title}</h2>
                    <p className="text-gray-600">
                        <span className="mr-2">✨</span>
                        Изключителни парчета за незабравими моменти
                        <span className="ml-2">✨</span>
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => {
                        const hasDiscount = [0, 2, 4, 7].includes(index);
                        const discountPercent = hasDiscount ? [30, 25, 35, 40][Math.floor(Math.random() * 4)] : 0;
                        const discountPrice = hasDiscount ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;

                        return (
                            <div key={item.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                                <div className="relative">
                                    <img 
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    {hasDiscount && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                                {discountPercent}% ОТСТЪПКА
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-4">{hasDiscount ? "Ограничено Време за Оферта" : "Ексклузивно Парче"}</p>
                                    <div className="flex flex-col md:flex-row justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            {hasDiscount ? (
                                                <>
                                                    <span className="text-2xl font-light line-through text-gray-400">{item.price}лв</span>
                                                    <span className="text-2xl font-bold text-red-600">{discountPrice}лв</span>
                                                </>
                                            ) : (
                                                <span className="text-2xl font-semibold text-gray-800">{item.price}лв</span>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => handleReserveClick(item)}
                                            className={`${hasDiscount ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-700'} text-white px-6 py-2 mt-2 md:mt-0 rounded-full transition`}
                                        >
                                            Резервирай за Коледа
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
        </ScrollAnimation>
    );
};

export default Collection;