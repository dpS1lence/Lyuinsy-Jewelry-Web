import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScrollAnimation from "../components/ScrollAnimation";
import { getOneCollection } from '../lib/appwrite';

const Collection = () => {
    const { id } = useParams(); // Extract collection ID from URL
    const [collection, setCollection] = useState(null); // Initialize state for collection
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const data = await getOneCollection(id); // Await the promise
                setCollection(data);
            } catch (error) {
                console.error("Failed to fetch collection:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollection();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state
    }

    if (!collection) {
        return <div>Collection not found</div>; // Show if collection is null
    }

    const { name, description, items } = collection;

    const handleReserveClick = (item) => {
        console.log(`Reserved: ${item.name}`);
    };

    return (
        <ScrollAnimation>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 relative">
                        <h2 className="text-3xl font-serif mb-4">{name}</h2>
                        <p className="text-gray-600">{description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {items.map((item) => {
                            const { $id, name, description, image, oldPrice, actualPrice, specialOffer } = item;

                            return (
                                <div key={$id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                                    <div className="relative">
                                        <img 
                                            src={image}
                                            alt={name}
                                            className="w-full h-64 object-cover"
                                        />
                                        {specialOffer && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                                    Специална Оферта
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-serif mb-2">{name}</h3>
                                        <p className="text-gray-600 mb-4">{description}</p>
                                        <div className="flex flex-col md:flex-row justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                {oldPrice ? (
                                                    <>
                                                        <span className="text-2xl font-light line-through text-gray-400">{oldPrice}лв</span>
                                                        <span className="text-2xl font-bold text-red-600">{actualPrice}лв</span>
                                                    </>
                                                ) : (
                                                    <span className="text-2xl font-semibold text-gray-800">{actualPrice}лв</span>
                                                )}
                                            </div>
                                            <button 
                                                onClick={() => handleReserveClick(item)}
                                                className={`${specialOffer ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-700'} text-white px-6 py-2 mt-2 md:mt-0 rounded-full transition`}
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
