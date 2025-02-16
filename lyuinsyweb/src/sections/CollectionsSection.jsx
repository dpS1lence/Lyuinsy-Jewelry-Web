import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllCollections } from "../lib/appwrite";
import { Databases } from "appwrite";

export default function CollectionsSection() {
    const [collections, setItems] = useState([]);
    const databases = new Databases();

    useEffect(() => {
        // Fetch items from Appwrite
        const fetchItems = async () => {
            try {
                const collectionsall = await getAllCollections();
                setItems(collectionsall);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <section className="py-10 bg-accentbackground">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <h2 className="text-5xl font-serif mb-4 text-text">Нашите Колекции</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <Link 
                            key={collection.$id}
                            to={`/collection/${collection.slug}`}
                            className={`group cursor-pointer bg-background overflow-hidden transition-all duration-300`}
                        >
                            <div className="aspect-w-16 aspect-h-9 relative">
                                <img 
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 bg-[#ffffff]">
                                <h3 className="text-2xl font-serif mb-2 transition-colors">
                                    {collection.name}
                                </h3>
                                <div className="flex items-center text-text font-medium">
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};