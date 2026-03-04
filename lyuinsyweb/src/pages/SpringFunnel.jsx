import JewelryWoman from "../assets/images/gradinetwomanbg/womanpinkbg.png";
import JewelryWomanMobile from "../assets/images/gradinetwomanbg/phonepinkwomanbg.png";
import { Link } from "react-router-dom";
import VideoSection from "../sections/VideoSection3";
import { useEffect } from "react";

export default function SpringFunnel() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        <VideoSection />
        <div className="absolute inset-0 flex items-center justify-center md:justify-start">
          <div className="container mx-auto px-4">
            <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl bg-white bg-opacity-90 p-4 sm:p-6 md:p-8 rounded-lg mx-auto md:mx-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-text mb-3 sm:mb-4 md:mb-6 text-center md:text-left">
                Ръчно изработени бижута с душа
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-text mb-4 sm:mb-5 md:mb-6 text-center md:text-left">
                Всяко бижу разказва история, създадена с любов и внимание към
                детайла
              </p>
              <div className="text-center md:text-left">
                <Link
                  to="/collection/all"
                  className="bg-black text-white border border-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-medium inline-block hover:bg-white hover:text-black transition-colors text-sm sm:text-base"
                >
                  Разгледай категорията
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">
              Изкуството на ръчно изработените бижута
            </h2>
            <p className="text-lg mb-8">
              Нашите бижута са създадени с 18 карата златно покритие, естествени
              камъни и перли, чешки цирконии, изработени по технология
              Сваровски. Всеки детайл е внимателно подбран, за да създаде
              уникално произведение на изкуството, което ще носите с гордост.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium text-pink-600">
                ✨ Безплатна доставка за поръчки над 50 € ✨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creation Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">
            Пътят на едно бижу
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 h-64 mb-4 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">
                  Снимка: Вдъхновение
                </span>
              </div>
              <h3 className="text-xl font-serif mb-2">Вдъхновение</h3>
              <p>
                Всяко бижу започва като идея, вдъхновена от природата,
                изкуството или емоцията, която искаме да предадем.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-64 mb-4 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">Снимка: Дизайн</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Дизайн</h3>
              <p>
                Нашите дизайнери превръщат идеята в скица, подбират материалите
                и планират всеки детайл.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-64 mb-4 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">Снимка: Изработка</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Ръчна изработка</h3>
              <p>
                С прецизност и майсторство, всяко бижу се изработва на ръка,
                като се влага внимание към всеки детайл.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-64 mb-4 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">Снимка: Опаковане</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Опаковане</h3>
              <p>
                Завършеното бижу се опакова в елегантна кутия с персонализирана
                картичка, готово да зарадва своя нов собственик.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">
            Нашите бижута
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-80 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Снимка: Гривна</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">
                  Пролетна гривна "Цветна градина"
                </h3>
                <p className="mb-4">
                  Ръчно изработена гривна с естествени камъни и 18 карата златно
                  покритие, вдъхновена от пролетните цветя.
                </p>
                <p className="text-lg font-medium mb-4">89.00 €</p>
                <Link
                  to="/item/spring-bracelet"
                  className="bg-black text-white border border-black px-6 py-2 font-medium inline-block hover:bg-white hover:text-black transition-colors w-full text-center"
                >
                  Поръчай сега
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-80 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Снимка: Колие</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">
                  Колие "Морска перла"
                </h3>
                <p className="mb-4">
                  Елегантно колие с естествена перла и златно покритие, което
                  подчертава женствеността и изяществото.
                </p>
                <p className="text-lg font-medium mb-4">119.00 €</p>
                <Link
                  to="/item/pearl-necklace"
                  className="bg-black text-white border border-black px-6 py-2 font-medium inline-block hover:bg-white hover:text-black transition-colors w-full text-center"
                >
                  Поръчай сега
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-80 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Снимка: Обеци</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">
                  Обеци "Кристални капки"
                </h3>
                <p className="mb-4">
                  Деликатни обеци с чешки цирконии, които добавят блясък към
                  всеки тоалет и повод.
                </p>
                <p className="text-lg font-medium mb-4">75.00 €</p>
                <Link
                  to="/item/crystal-earrings"
                  className="bg-black text-white border border-black px-6 py-2 font-medium inline-block hover:bg-white hover:text-black transition-colors w-full text-center"
                >
                  Поръчай сега
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/collections"
              className="bg-white text-black border border-black px-8 py-4 font-medium inline-block hover:bg-black hover:text-white transition-colors"
            >
              Разгледай всички категории
            </Link>
          </div>
        </div>
      </section>

      {/* Packaging Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">
                  Снимка: Луксозна опаковка
                </span>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif mb-6">
                Луксозно опаковане за специален подарък
              </h2>
              <p className="text-lg mb-6">
                Всяко наше бижу заслужава специално представяне. Затова
                опаковаме продуктите си в елегантни кутии, добавяме
                персонализирана картичка с послание и малък подарък изненада.
              </p>
              <p className="text-lg mb-6">
                Независимо дали купувате за себе си или за подарък, опаковката
                ни ще направи момента на отваряне незабравим.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">
                  ✨ Безплатно опаковане за подарък при всяка поръчка
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">
            Какво казват нашите клиенти
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium">Мария Иванова</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="italic">
                "Получих гривната като подарък от съпруга ми и съм възхитена от
                качеството и красотата ѝ. Опаковката беше прекрасна, а малката
                картичка с послание - много трогателна."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium">Елена Петрова</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="italic">
                "Колието, което поръчах, пристигна много бързо и изглежда дори
                по-красиво на живо. Получавам много комплименти, когато го нося.
                Определено ще поръчвам отново!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 w-12 h-12 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium">Стефан Димитров</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="italic">
                "Поръчах обеци за годишнината ни и съпругата ми беше възхитена.
                Обслужването беше отлично, а доставката - точно навреме за
                специалния ден. Благодаря за прекрасния подарък!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">
            Открийте своето уникално бижу днес
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Нашите ръчно изработени бижута са създадени с любов и внимание към
            всеки детайл. Подарете си или на любим човек нещо специално, което
            ще се носи с радост дълги години.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/collections"
              className="bg-white text-black px-8 py-4 font-medium hover:bg-gray-200 transition-colors"
            >
              Разгледай категориите
            </Link>
            <Link
              to="/collection/all"
              className="bg-transparent text-white border border-white px-8 py-4 font-medium hover:bg-white hover:text-black transition-colors"
            >
              Най-популярни бижута
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-medium mb-2">Бърза доставка</h3>
              <p>Доставяме до 24 часа за София и до 48 часа за страната</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="font-medium mb-2">Безплатно опаковане</h3>
              <p>
                Луксозна опаковка и персонализирана картичка с всяка поръчка
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-medium mb-2">Качествени материали</h3>
              <p>
                18 карата златно покритие и естествени камъни за дълготрайна
                красота
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
