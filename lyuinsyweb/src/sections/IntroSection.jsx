import JewelryWoman from "../assets/images/jpg.avif";
import JewelryWoman2 from "../assets/images/woman/4.png";
import { useNavigate } from "react-router-dom";
export default function IntroSection() {

  const navigate = useNavigate();

  const navigateCollections = () => {
    navigate(`/collections`);
};

    return (
        <section className="relative flex">
          {/* Image */}
          <div className="w-full relative">
            <img 
              src={JewelryWoman} 
              alt="Колекция от елегантни бижута" 
              className="w-full h-[40rem] lg:w-full lg:h-[70rem] object-cover animate-kenburns lg:object-cover lg:object-center"
              style={{ objectPosition: 'right' }}
            />
            {/* Content Overlay */}
            <div className="absolute bottom-0 lg:bottom-60 left-0 lg:w-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 flex flex-col items-start p-8 transition-opacity">
              <h1 className="text-4xl lg:text-5xl font-serif text-text mb-6 drop-shadow-lg">
                Направи този Свети Валентин незабравим
              </h1>
              <p className="text-xl text-text mb-8 leading-relaxed">
                Открийте нашата изключителна колекция от бижута за Свети Валентин и 8-ми март, 
                където всяко парче разказва история за елегантност и любов
              </p>
              <div className="space-y-4">
                <button onClick={navigateCollections} className="bg-black text-white border border-black px-8 py-4 font-medium w-full lg:w-auto hover:bg-white hover:text-black">
                  Покажи Колекцията за Свети Валентин
                </button>
                <div className="text-text text-sm animate-pulse">
                  Безплатно опаковане на подаръци | Доставка за следващия ден | Гаранция за празници
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};