import { useState, useEffect } from 'react';

export default function ReviewsSection() {
    const reviews = [
        {
          name: "Сара Мичъл",
          image: "https://randomuser.me/api/portraits/women/6.jpg", 
          rating: 5,
          text: "Диамантеният Вечен Пръс Изработката е безупречна, а блясъкът му е като нищо, което съм виждала преди!",
          title: "Абсолютно Зашеметяващ"
        },
        {
          name: "Джеймс Уилсън",
          image: "https://randomuser.me/api/portraits/men/2.jpg",
          rating: 5, 
          text: "Съпругата ми остана без думи, когато й подарих Сапфирения Пендант. Качеството и вниманието към детайла са забележителни.",
          title: "Перфектният Подарък за Годишнина"
        },
        {
          name: "Емили Чен",
          image: "https://randomuser.me/api/portraits/women/3.jpg",
          rating: 5,
          text: "Бисерната Гривна е чиста елегантност. Всеки бисер е перфектно подбран, а златните настройки са изящно изработени.",
          title: "Чиста Елегантност"
        },
        {
          name: "Майкъл Браун",
          image: "https://randomuser.me/api/portraits/men/4.jpg",
          rating: 5,
          text: "Изключително обслужване и още по-добри бижута. Парчетата са точно както са описани, а качеството е изключително.",
          title: "Изключително Качество"
        },
        {
          name: "София Родригес",
          image: "https://randomuser.me/api/portraits/women/5.jpg",
          rating: 5,
          text: "Никога не съм получавала толкова много комплименти за бижу преди. Истински разговорен стартер!",
          title: "Спирач на Вниманието"
        }
      ];
    
      const [currentReview, setCurrentReview] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          handleNextReview();
        }, 5000);
        return () => clearInterval(interval);
      }, [currentReview]);
    
      const handlePrevReview = () => {
        setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
      };
    
      const handleNextReview = () => {
        setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
      };

    return (
        <section className="py-12 bg-accentbackground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 relative">
            <h2 className="text-4xl font-serif text-text">Какво казват нашите клиенти</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="min-w-full">
                    <div className="flex items-center gap-8 bg-background rounded-lg p-8 shadow-md">
                      <div className="w-1/3">
                        <img 
                          src={review.image} 
                          alt={review.name}
                          className="w-32 h-32 rounded-lg object-cover shadow-lg mx-auto"
                        />
                      </div>
                      <div className="w-2/3 space-y-3">
                        <h3 className="text-2xl font-serif text-text">{review.title}</h3>
                        <div className="text-discount text-lg">
                          {'★'.repeat(review.rating)}
                        </div>
                        <p className="text-text text-lg">"{review.text}"</p>
                        <p className="text-text font-medium">{review.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={handlePrevReview}
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={handleNextReview}
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
)};