import Jewelry1 from "../assets/images/8.png";
import Jewelry2 from "../assets/images/6.png";
import Jewelry3 from "../assets/images/5.png";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";

export default function BestSellerSection() {
    const navigate = useNavigate();

    const handleReserveClick = () => {
        navigate({
            pathname: '/item-purchase-direct/' + 2
        });
    };

    return (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-8">
        <ScrollAnimation>
          <div className="text-center relative">
            <span className="text-5xl animate-bounce">🎄</span>
            <h2 className="text-5xl font-serif mb-6 text-gray-900">Коледни Бестселъри</h2>
            <p className="text-gray-600 text-xl">
              <span className="mr-2">✨</span>
              Създайте магически моменти с нашата изключителна колекция
              <span className="ml-2">✨</span>
            </p>
          </div>

            <div className="flex items-center justify-center mt-12 mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent w-32"></div>
                <span className="mx-4 text-2xl">✧</span>
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent w-32"></div>
            </div>
            </ScrollAnimation>
          <div className="space-y-40">
            {/* Best Seller 1 */}
            <ScrollAnimation>
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-center lg:gap-20">
                <div className="lg:w-3/5">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img src={Jewelry1} alt="Диамантено Вечно Кольцо" className="w-full lg:h-[600px] object-cover"/>
                      <div className="absolute top-6 right-6">
                        <span className="bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                          ✧ СПЕЦИАЛНА ОФЕРТА ✧
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <h2 className="text-4xl font-serif mb-8">Съвършеното Коледно Подарък</h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Нашето <span className="font-semibold text-gray-800">сигнатурно Диамантено Вечно Кольцо</span> въплъщава духа на безкрая любов. Всяко диамант е внимателно избрано, за да създаде <span className="font-semibold text-gray-800">съвършен кръг на блеска</span>.
                    </p>
                    <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-8">
                      <li>Премиум 18к бяло злато</li>
                      <li>15 кръгли блестящи диаманта (общо 2.5 карата)</li>
                      <li>Гаранция за цял живот включена</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-light line-through text-gray-400">53.40лв</span>
                        <span className="text-4xl font-bold text-emerald-700">32.20лв</span>
                      </div>
                      <span className="text-emerald-700 lg:">★★★★★ (128)</span>
                    </div>
                    <div className="text-sm text-emerald-700 font-semibold">
                      🎁 Безплатно опаковка за подарък и доставка за следващия ден
                    </div>
                    <div className="flex justify-center items-center text-center">
                    <button onClick={handleReserveClick} className="w-full md:w-3/4 bg-emerald-700 text-white py-4 rounded-full hover:bg-emerald-800 transition">
                      Резервирай сега за Коледа
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </ScrollAnimation>
            <ScrollAnimation>
            {/* Best Seller 2 */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
                <div className="lg:w-3/5">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img src={Jewelry2} alt="Сапфирен Пендант" className="w-full lg:h-[600px] object-cover"/>
                      <div className="absolute top-6 right-6">
                        <span className="bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                          ✧ СПЕЦИАЛНА ОФЕРТА ✧
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <h2 className="text-4xl font-serif mb-8">Докосване на Зимната Магия</h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Нашето <span className="font-semibold text-gray-800">Кралско Сапфирено Кольцо</span> улавя сущността на зимната красота. <span className="font-semibold text-gray-800">Дълбокият син Цейлон сапфир</span> е перфектно допълнен от блестящи диаманти.
                    </p>
                    <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-8">
                      <li>Редък Цейлон сапфир в центъра</li>
                      <li>Сетинг от диаманти</li>
                      <li>Платинена верига включена</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-light line-through text-gray-400">102.90лв</span>
                        <span className="text-4xl font-bold text-emerald-700">77.80лв</span>
                      </div>
                      <span className="text-emerald-700">★★★★★ (96)</span>
                    </div>
                    <div className="text-sm text-emerald-700 font-semibold">
                      ❄️ Поръчайте сега за гарантирана доставка за Коледа
                    </div>
                    <div className="flex justify-center items-center text-center">
                    <button onClick={handleReserveClick} className="w-full md:w-3/4 bg-emerald-700 text-white py-4 rounded-full hover:bg-emerald-800 transition">
                      Резервирай сега за Коледа
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </ScrollAnimation>
            {/* Best Seller 3 */}
            <ScrollAnimation>
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-3/5">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img src={Jewelry3} alt="Бисерен Браслет" className="w-full lg:h-[600px] object-cover"/>
                      <div className="absolute top-6 right-6">
                        <span className="bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                          ✧ СПЕЦИАЛНА ОФЕРТА ✧
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <h2 className="text-4xl font-serif mb-8">Зимните Най-Фини Бисери</h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Нашето <span className="font-semibold text-gray-800">Бисерен Браслет от Южните Мори</span> носи елегантност на всяко коледно тържество. Всяко бисер е <span className="font-semibold text-gray-800">внимателно избрано</span> заради изключителната му сия.
                    </p>
                    <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-8">
                      <li>Премиум бисери от Южните Мори</li>
                      <li>Сетинг от 18к жълто злато</li>
                      <li>Сигнатурна опаковка за подарък</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-light line-through text-gray-400">54.80лв</span>
                        <span className="text-4xl font-bold text-emerald-700">48.50лв</span>
                      </div>
                      <span className="text-emerald-700">★★★★½ (84)</span>
                    </div>
                    <div className="text-sm text-emerald-700 font-semibold">
                      🎄 Включва луксозна коледна опаковка за подарък
                    </div>
                    <div className="flex justify-center items-center text-center">
                    <button onClick={handleReserveClick} className="w-full md:w-3/4 bg-emerald-700 text-white py-4 rounded-full hover:bg-emerald-800 transition">
                      Резервирай сега за Коледа
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
)};