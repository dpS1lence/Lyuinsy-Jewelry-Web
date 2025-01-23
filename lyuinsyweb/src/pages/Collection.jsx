import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScrollAnimation from "../components/ScrollAnimation";
import { useNavigate } from "react-router-dom";
import { getOneCollection } from '../lib/appwrite';

const Collection = () => {
    const { id } = useParams(); // Extract collection ID from URL
    const [collection, setCollection] = useState(null); // Initialize state for collection
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

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
        return <div>Loading...</div>; // Show if collection is null
    }

    const { name, description, items } = collection;

    const handleReserveClick = (itemId) => {
        navigate(`/item-purchase-direct/${itemId}`);
    };

    return (
        <ScrollAnimation>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 relative">
                        <h2 className="text-3xl font-serif mb-4 text-text">{name}</h2>
                        <p className="text-text">{description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {items.map((item) => {
                            const { $id, name, description, image, oldPrice, actualPrice, specialOffer, quantity } = item;

                            return (
                                <div key={$id} className="group cursor-pointer bg-background shadow-sm overflow-hidden" onClick={() => handleReserveClick(item.$id)}>
                                    <div className="relative">
                                        <img 
                                            src={image}
                                            alt={name}
                                            className={`w-full h-64 object-cover ${quantity === 0 ? 'filter grayscale' : ''}`}
                                        />
                                        {quantity === 0 && (
                                            <div className="absolute inset-0 bg-accentbackground opacity-50 flex items-center justify-center">
                                                <span className="text-white text-xl font-bold">Изчерпана</span>
                                            </div>
                                        )}
                                        {specialOffer && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-discount text-white px-4 py-1 rounded-full text-sm font-bold">
                                                    Специална Оферта
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-serif mb-2 text-text">{name}</h3>
                                        <p className="text-text mb-4">{description}</p>
                                        <div className="flex flex-col md:flex-row justify-between items-start">
                                            <div className="flex items-start gap-2">
                                                {oldPrice ? (
                                                    <>
                                                        <span className="text-2xl font-light line-through text-text">{oldPrice}лв</span>
                                                        <span className="text-2xl font-thin text-discount">{actualPrice}лв</span>
                                                    </>
                                                ) : (
                                                    <span className="text-2xl font-thin text-text">{actualPrice}лв</span>
                                                )}
                                            </div>
                                            <button 
                                                onClick={() => handleReserveClick(item.$id)}
                                                className={`${specialOffer ? 'bg-discount hover:bg-red' : 'bg-buttonPrimary hover:bg-buttonHover'} text-white px-6 py-2 mt-2 md:mt-0 rounded-full transition ${quantity === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                                disabled={quantity === 0}
                                            >
                                                Разгледай
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
