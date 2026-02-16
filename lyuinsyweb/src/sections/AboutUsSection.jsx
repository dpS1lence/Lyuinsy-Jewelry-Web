import { useState } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "../components/OptimizedImage";
import woman1 from "../assets/images/woman/Angel.png";
import woman2 from "../assets/images/woman/8.png";
import woman3 from "../assets/images/woman/9.png";

export default function AboutUsSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-10 mx-auto px-4 container relative">
      <h2 className="text-5xl font-serif mb-6 text-text">
        Бижута Lusy - История
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-60"}`}
      >
        <p className="text-text text-xl">
          Добре дошли в Lusy – мястото, където изкуството среща елегантността!
          Ние създаваме уникални ръчно изработени бижута, които подчертават
          женствеността и стила на всяка дама.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          <div className="bg-white">
            <OptimizedImage
              src={woman3}
              alt="Визия и философия"
              className="w-full object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-3xl font-serif mb-2 text-text">
              Визия и философия
            </h3>
            <p className="text-text text-lg">
              В Lusy съчетаваме традицията на ръчната изработка с модерния
              дизайн, за да предложим нещо повече от обикновено украшение.
            </p>
          </div>
          <div className="bg-white">
            <OptimizedImage
              src={woman2}
              alt="Ръчно изработени бижута"
              className="w-full object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-3xl font-serif mb-2 text-text">
              Ръчно изработени бижута
            </h3>
            <p className="text-text text-lg">
              Ние ценим майсторството и креативността, затова всяко бижу е
              създадено с прецизност и усет към детайла.
            </p>
          </div>
          <div className="bg-white">
            <OptimizedImage
              src={woman1}
              alt="Женственост и стил"
              className="w-full object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-3xl font-serif mb-2 text-text">
              Женственост и стил
            </h3>
            <p className="text-text text-lg">
              Lusy е създаден за модерната жена, която обича да бъде различна и
              елегантна.
            </p>
          </div>
        </div>
        <h3 className="text-4xl font-serif mb-6 text-text">Нашето обещание</h3>
        <p className="text-text mb-6 text-lg">
          В Lusy вярваме в качеството и удовлетворението на клиентите. Нашите
          бижута са символ на любов и артистичност.
        </p>
        <p className="text-text mb-6 text-lg">
          Открийте света на Lusy и позволете на нашите бижута да разкажат вашата
          история!
        </p>
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </motion.div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 px-6 py-2 bg-primary text-black font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-all"
        >
          {expanded ? "Покажи по-малко" : "Прочети повече"}
        </button>
      </div>
    </section>
  );
}
