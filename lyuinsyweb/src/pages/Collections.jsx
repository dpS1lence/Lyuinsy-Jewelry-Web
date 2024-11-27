import Jewelry1 from "../assets/images/9.png";
import Jewelry2 from "../assets/images/10.png";
import Jewelry3 from "../assets/images/11.png";
import Jewelry4 from "../assets/images/12.png";
import Jewelry5 from "../assets/images/13.png";
import Jewelry6 from "../assets/images/14.png";
import { Link } from 'react-router-dom';
import ScrollAnimation from "../components/ScrollAnimation";
import { useEffect } from 'react';

const Collections = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
      }, []);
      
    const collections = [
        {
            id: 1,
            title: "Кралската Колекция",
            description: "Вечни произведения с безценни камъни и сложни дизайни, достойни за кралски особи",
            image: Jewelry1,
            theme: "bg-purple-50"
        },
        {
            id: 2,
            title: "Модерен Минимализъм",
            description: "Чисти линии и съвременни дизайни за модерния изискан вкус",
            image: Jewelry2,
            theme: "bg-gray-50"
        },
        {
            id: 3,
            title: "Винтидж Блясък",
            description: "Парчета, вдъхновени от арт деко, които улавят същността на класическия Холивуд",
            image: Jewelry3,
            theme: "bg-amber-50"
        },
        {
            id: 4,
            title: "Прегръдката на Природата",
            description: "Органични форми и естествени елементи, превърнати в носимо изкуство",
            image: Jewelry4,
            theme: "bg-emerald-50"
        },
        {
            id: 5,
            title: "Сватбени Мечти",
            description: "Изискани произведения, които ще направят вашия специален ден още по-незабравим",
            image: Jewelry5,
            theme: "bg-rose-50"
        },
        {
            id: 6,
            title: "Съкровищата на Океана",
            description: "Вдъхновени от мистиката на морето, с перли и аквамаринови камъни",
            image: Jewelry6,
            theme: "bg-blue-50"
        }
    ];

    return (
        
    <ScrollAnimation>
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif mb-4">Нашите Колекции</h2>
                    <p className="text-gray-600">
                        Открийте нашите внимателно подбрани колекции, всяка от които разказва своята уникална история
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection) => (
                        <Link to={`/collection/${collection.id}`} key={collection.id}>
                            <div 
                                className={`group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${collection.theme}`}
                            >
                                <div className="aspect-w-16 aspect-h-9 relative">
                                    <img 
                                        src={collection.image}
                                        alt={collection.title}
                                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-serif mb-2 group-hover:text-emerald-700 transition-colors">
                                        {collection.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {collection.description}
                                    </p>
                                    <div className="flex items-center text-emerald-700 font-medium">
                                        <span>Изследвай Колекцията</span>
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