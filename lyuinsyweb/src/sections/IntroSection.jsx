import JewelryWoman from "../assets/images/woman.png";

export default function IntroSection() {
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
                Направи тази Коледа незабравима
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                Открийте нашата очароваща колекция от бижута за празници, 
                където всяко парче разказва история за елегантност и любов
              </p>
              <div className="space-y-4">
                <button className="bg-red-700 text-white px-8 py-4 rounded-full font-medium hover:bg-red-800 transition-all transform hover:scale-105 shadow-lg w-full lg:w-auto">
                  🎄 Покажи Колекцията за Празници
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