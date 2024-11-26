import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../assets/images/Lyuinsy.png";
import HolidayPopup from "./HolidayPopup";

export default function Layout() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
        setIsPopupOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HolidayPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
      
      {/* Обявителен банер */}
      <div className="bg-emerald-700 text-white text-center py-2 px-4">
        <p className="text-sm font-medium animate-pulse">
          🎄 Коледно Специално: Безплатна доставка на поръчки над $100 | Използвайте код: КОЛЕДА2023 ✨
        </p>
      </div>

      {/* Банер с логото */}
      <div className="bg-white py-4 flex justify-center">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Бижута Люинси" className="w-32 hover:opacity-90 transition-opacity" />
        </div>
      </div>

      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap items-center justify-center space-x-4 md:space-x-12">
            <a href="/home" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Начало</a>
            <a href="/collections" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Колекции</a>
            <a href="/about" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">За нас</a>
            <a href="/contact" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Контакт</a>
            <button className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition-colors">
              Купи сега
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
{/* Апел за действие */}
<section className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-serif mb-6">Присъедини се към нашия VIP списък</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
            Бъдете първите, които ще получат достъп до нашите ексклузивни колекции за празници и специалните сезонни оферти. 
            Получавайте персонализирани препоръки и VIP-ексклузивни отстъпки.
          </p>
          <div className="max-w-md mx-auto bg-white/10 p-1 rounded-full backdrop-blur-sm mb-8">
            <div className="flex">
              <input 
                type="email"
                placeholder="Въведете вашата имейл адреса"
                className="flex-1 bg-transparent px-6 py-3 text-white placeholder-gray-300 focus:outline-none"
              />
              <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition transform hover:scale-105">
                Присъедини се към VIP клуба
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            ✨ Ексклузивен достъп | 🎁 Специални оферти | 💝 VIP събития
          </p>
        </div>
      </section>
      <footer className="bg-emerald-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Елегантни Бижута</h3>
              <p className="text-emerald-100">Създаваме безвременни бижута от 1990 г.</p>
            </div>
            <div>
              <h4 className="text-lg mb-4">Бързи линкове</h4>
              <ul className="space-y-2 text-emerald-100">
                <li><a href="/shipping" className="hover:text-white">Информация за доставка</a></li>
                <li><a href="/returns" className="hover:text-white">Възстановяване</a></li>
                <li><a href="/care" className="hover:text-white">Позабота за бижутата</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Свържи се с нас</h4>
              <address className="text-emerald-100 not-italic">
                <p>123 улица на бижутата</p>
                <p>Ню Йорк, НЙ 10001</p>
                <p>Email: info@elegantgems.com</p>
              </address>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
