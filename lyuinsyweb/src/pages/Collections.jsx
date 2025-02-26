import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllCollections } from "../lib/appwrite";
import { Databases } from "appwrite";
import ScrollAnimation from "../components/ScrollAnimation";
import allofit from "../assets/images/allofit.png";
import march8 from "../assets/images/march8collection.png";

const Collections = () => {
    const [collections, setItems] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
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
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchItems();
    }, []);

    if (loading) { // Conditional rendering for loading state
        return <div className="flex justify-center items-center h-screen"><p className="text-xl">Зареждане...</p></div>;
    }

    return (
        <ScrollAnimation>
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4 text-text">Нашите Колекции</h2>
                        <p className="text-text">
                            Открийте нашите внимателно подбрани колекции, всяка от която разказва своята уникална история
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link to={`/collection/kolekciq-8-mart`} key="all">
                                <div 
                                    className={`group cursor-pointer shadow-sm overflow-hidden transition-all duration-300`}
                                >
                                    <div className="aspect-w-16 aspect-h-9 relative">
                                        <img 
                                            src={march8}
                                            alt="all"
                                            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-serif mb-2 group-hover:text-text transition-colors">
                                            Подаръци за 8 март
                                        </h3>
                                        <p className="text-text mb-4">
                                            Цпециално подбрани бижута, подходящи за 8-ми март + картичка с послание от дизайнерсия екип...
                                        </p>
                                    </div>
                                </div>
                            </Link>
                    <Link to={`/collection/all`} key="all">
                                <div 
                                    className={`group cursor-pointer shadow-sm overflow-hidden transition-all duration-300`}
                                >
                                    <div className="aspect-w-16 aspect-h-9 relative">
                                        <img 
                                            src={allofit}
                                            alt="all"
                                            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-serif mb-2 group-hover:text-text transition-colors">
                                            All Jewelry
                                        </h3>
                                        <p className="text-text mb-4">
                                            Всички бижута
                                        </p>
                                    </div>
                                </div>
                            </Link>
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