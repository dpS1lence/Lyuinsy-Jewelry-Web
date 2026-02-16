import { useState, useEffect } from "react";
import OptimizedImage from "../components/OptimizedImage";
import img1 from "../assets/images/womanstock/1.png";
import img2 from "../assets/images/womanstock/2.png";
import img3 from "../assets/images/womanstock/3.png";
import img4 from "../assets/images/womanstock/4.png";
import img5 from "../assets/images/womanstock/5.png";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Милена Георгиева",
      image: img1,
      rating: 5,
      text: "Поръчах с малко притеснение, защото не обичам да купувам бижута онлайн, но бях приятно изненадана! Гривната е много стилна, а изработката изглежда качествена. Доставката беше навреме, добре опаковано, без забележки. Определено ще поръчам пак!",
      title: "Без забележки",
    },
    {
      name: "Даниела Петрова",
      image: img2,
      rating: 5,
      text: "Колието, което взех, е още по-красиво на живо! Стои елегантно и нежно, точно това, което търсех. Харесва ми, че не е твърде лъскаво, а с изчистен и стилен дизайн. Досега не бях поръчвала от този сайт, но останах доволна.",
      title: "Стилен дизайн",
    },
    {
      name: "Мария Николова",
      image: img3,
      rating: 5,
      text: "Много съм доволна от покупката! Гривната, която взех, е лека, удобна и изглежда качествена. Носих я няколко пъти и не е променила цвета си, което беше най-голямото ми притеснение. Доставката отне няколко дни, но всичко беше наред.",
      title: "Лека, удобна и качествена",
    },
    {
      name: "Ивелина Стоянова",
      image: img4,
      rating: 5,
      text: "Купих обеци за подарък и приятелката ми беше очарована! Много фина изработка, без евтин блясък или тежест. Опаковката също беше хубава, което прави цялостното впечатление по-добро. Радвам се, че избрах точно този магазин.",
      title: "Много фина изработка",
    },
    {
      name: "Елица Василева",
      image: img5,
      rating: 5,
      text: "Поръчах си гривна и съм супер доволна! Размерът пасна идеално, а камъкът блести красиво на светлина. Нося я вече две седмици и изглежда като нова. Бях скептична в началото, но определено си заслужаваше.",
      title: "Блести красиво на светлина",
    },
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
          <h2 className="text-4xl font-serif text-text">
            Какво казват нашите клиенти
          </h2>
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
                      <OptimizedImage
                        src={review.image}
                        alt={review.name}
                        className="w-32 h-32 rounded-lg object-cover shadow-lg mx-auto"
                      />
                    </div>
                    <div className="w-2/3 space-y-3">
                      <h3 className="text-2xl font-serif text-text">
                        {review.title}
                      </h3>
                      <div className="text-discount text-lg">
                        {"★".repeat(review.rating)}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNextReview}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
