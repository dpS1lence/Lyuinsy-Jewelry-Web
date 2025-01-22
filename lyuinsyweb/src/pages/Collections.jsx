import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCollections } from "../lib/appwrite";
import { Databases } from "appwrite";
import { Link } from 'react-router-dom';
import ScrollAnimation from "../components/ScrollAnimation";

const Collections = () => {
    const [collections, setItems] = useState([]);
    const navigate = useNavigate();
    const databases = new Databases();

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchItems = async () => {
            try {
                const itemsFetch = await getAllCollections();
                const filteredItems = itemsFetch; //.filter(item => item['collectionSpecialOffer']);
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
                        <Link to={`/collection/${collection.$id}`} key={collection.id}>
                            <div 
                                className={`group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${collection.theme}`}
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
                                    <div className="flex items-center text-text font-medium">
                                        <button className="text-discount hover:text-red">Изследвай Колекцията</button>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
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