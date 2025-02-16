import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllCollections } from "../lib/appwrite";
import { Databases } from "appwrite";
import ScrollAnimation from "../components/ScrollAnimation";

const Collections = () => {
    const [collections, setItems] = useState([]);
    const databases = new Databases();

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchItems = async () => {
            try {
                const itemsFetch = await getAllCollections();
                const filteredItems = itemsFetch;
                setItems(filteredItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        
    <ScrollAnimation>
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif mb-4 text-text">Нашите Колекции</h2>
                    <p className="text-text">
                        Открийте нашите внимателно подбрани колекции, всяка от които разказва своята уникална история
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <Link to={`/collection/${collection.slug}`} key={collection.id}>
                            <div 
                                className={`group cursor-pointer shadow-sm overflow-hidden transition-all duration-300 ${collection.theme}`}
                            >
                                <div className="aspect-w-16 aspect-h-9 relative">
                                    <img 
                                        src={collection.image}
                                        alt={collection.name}
                                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-serif mb-2 group-hover:text-text transition-colors">
                                        {collection.name}
                                    </h3>
                                    <p className="text-text mb-4">
                                        {collection.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
        </ScrollAnimation>
    );
};

export default Collections;