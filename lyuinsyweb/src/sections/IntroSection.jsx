import JewelryWoman from "../assets/images/woman.png";
import { useNavigate } from "react-router-dom";
export default function IntroSection() {

  const navigate = useNavigate();

  const navigateCollections = () => {
    navigate(`/collections`);
};

    return (
        <section className="relative h-screen flex flex-col lg:flex-row">
          {/* Left side - Image */}
          <div className="w-full lg:w-2/3 h-full relative">
            <img 
              src={JewelryWoman} 
              alt="Колекция от елегантни бижута" 
              className="w-full h-full object-cover animate-kenburns"
            />
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-1/3 bg-emerald-900 flex items-center py-10">
            <div className="px-8 lg:px-12 animate-fade-in-up">
              <h1 className="text-4xl lg:text-5xl font-serif text-white mb-6 drop-shadow-lg">
                Направи този Свети Валентин незабравим
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Открийте нашата изключителна колекция от бижута за Свети Валентин и 8-ми март, 
                където всяко парче разказва история за елегантност и любов
              </p>
              <div className="space-y-4">
                <button onClick={navigateCollections} className="bg-red-600 text-white px-8 py-4 rounded-full font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg w-full lg:w-auto">
                  💖 Покажи Колекцията за Свети Валентин
                </button>
                <div className="text-white/80 text-sm animate-pulse">
                  🎁 Безплатно опаковане на подаръци | ✨ Доставка за следващия ден | 💝 Гаранция за празници
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};