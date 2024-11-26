import { useState, useEffect } from 'react';

export default function ReviewsSection() {
    const reviews = [
        {
          name: "Sarah Mitchell",
          image: "https://randomuser.me/api/portraits/women/1.jpg", 
          rating: 5,
          text: "The Diamond Eternity Ring exceeded all my expectations. The craftsmanship is impeccable, and it sparkles like nothing I've ever seen before!",
          title: "Absolutely Stunning"
        },
        {
          name: "James Wilson",
          image: "https://randomuser.me/api/portraits/men/2.jpg",
          rating: 5, 
          text: "My wife was speechless when I gave her the Sapphire Pendant. The quality and attention to detail is remarkable.",
          title: "Perfect Anniversary Gift"
        },
        {
          name: "Emily Chen",
          image: "https://randomuser.me/api/portraits/women/3.jpg",
          rating: 5,
          text: "The Pearl Bracelet is pure elegance. Each pearl is perfectly matched and the gold settings are beautifully crafted.",
          title: "Pure Elegance"
        },
        {
          name: "Michael Brown",
          image: "https://randomuser.me/api/portraits/men/4.jpg",
          rating: 5,
          text: "Outstanding service and even better jewelry. The pieces are exactly as described and the quality is exceptional.",
          title: "Exceptional Quality"
        },
        {
          name: "Sofia Rodriguez",
          image: "https://randomuser.me/api/portraits/women/5.jpg",
          rating: 5,
          text: "I've never received so many compliments on a piece of jewelry before. Truly a conversation starter!",
          title: "Show Stopper"
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
        <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 relative">
            <h2 className="text-4xl font-serif">What Our Clients Say</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="min-w-full">
                    <div className="flex items-center gap-8 bg-gray-50 rounded-lg p-8">
                      <div className="w-1/3">
                        <img 
                          src={review.image} 
                          alt={review.name}
                          className="w-32 h-32 rounded-lg object-cover shadow-lg mx-auto"
                        />
                      </div>
                      <div className="w-2/3 space-y-3">
                        <h3 className="text-2xl font-serif">{review.title}</h3>
                        <div className="text-emerald-700 text-lg">
                          {'★'.repeat(review.rating)}
                        </div>
                        <p className="text-gray-600 text-lg">"{review.text}"</p>
                        <p className="text-gray-800 font-medium">{review.name}</p>
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