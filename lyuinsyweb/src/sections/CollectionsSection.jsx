export default function CollectionsSection() {
    const collections = [
        {
            title: "Кралската Колекция",
            description: "Вечни произведения с безценни камъни и сложни дизайни, достойни за кралски особи",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000",
            theme: "bg-purple-50"
        },
        {
            title: "Модерен Минимализъм",
            description: "Чисти линии и съвременни дизайни за модерния изискан вкус",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
            theme: "bg-gray-50"
        },
        {
            title: "Винтидж Блясък",
            description: "Парчета, вдъхновени от арт деко, които улавят същността на класическия Холивуд",
            image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000",
            theme: "bg-amber-50"
        },
        {
            title: "Прегръдката на Природата",
            description: "Органични форми и естествени елементи, превърнати в носимо изкуство",
            image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000",
            theme: "bg-emerald-50"
        },
        {
            title: "Сватбени Мечти",
            description: "Изискани произведения, които ще направят вашия специален ден още по-незабравим",
            image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=1000",
            theme: "bg-rose-50"
        },
        {
            title: "Съкровищата на Океана",
            description: "Вдъхновени от мистиката на морето, с перли и аквамаринови камъни",
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
            theme: "bg-blue-50"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif mb-4">Нашите Колекции</h2>
                    <p className="text-gray-600">
                        Открийте нашите внимателно подбрани колекции, всяка от които разказва своята уникална история
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <div 
                            key={index}
                            className={`group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${collection.theme}`}
                        >
                            <div className="aspect-w-16 aspect-h-9 relative">
                                <img 
                                    src={collection.image}
                                    alt={collection.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
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
                    ))}
                </div>
            </div>
        </section>
    );
};