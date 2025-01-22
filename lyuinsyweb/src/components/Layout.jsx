import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../assets/images/Lyuinsyia.png";
import HolidayPopup from "./HolidayPopup";
import { useNavigate } from "react-router-dom";
import { saveEmail } from '../lib/appwrite'; // Import saveEmail function

export default function Layout() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState(''); // State for email input

  useEffect(() => { 
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
        setIsPopupOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  let navigate = useNavigate();
  const buynow = () => {
    navigate({
        pathname: '/collections'
    }); 
  };

  const handleEmailSubmit = async () => {
    const date = new Date().toISOString(); // Get the current datetime in ISO format

    try {
      await saveEmail({ email, date }); // Call saveEmail with email and date
      console.log("Email saved successfully");
      // Optionally, you can reset the email input or show a success message
      setEmail(''); // Clear the input after submission
    } catch (error) {
      console.error("Error saving email:", error.message); // Log only the error message
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HolidayPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
      
      {/* Обявителен банер */}
      <div className="bg-discount text-white text-center py-2 px-4">
        <p className="text-sm font-medium animate-pulse">
          ❤️ Специални предложения за Свети Валентин и 8-ми март! | Безплатна доставка на поръчки над 100лв ✨
        </p>
      </div>

      {/* Банер с логото */}
      <div className="bg-background flex justify-center">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Бижута Люинси" className="w-40 hover:opacity-90 transition-opacity" />
        </div>
      </div>

      <header className="bg-background border-b border-accentbackground relative">
        <div className="container mx-auto px-4 pb-4 relative z-10">
          <nav className="flex flex-wrap items-center justify-center space-x-4 md:space-x-12">
            <a href="/home" className="text-text hover:text-hover transition-colors font-medium">Начало</a>
            <a href="/collections" className="text-text hover:text-hover transition-colors font-medium">Колекции</a>
            <a href="/about" className="text-text hover:text-hover transition-colors font-medium">За нас</a>
            <a href="/contacts" className="text-text hover:text-hover transition-colors font-medium">Контакт</a>
            <button onClick={buynow} className="bg-black text-white border border-black px-8 py-2 font-medium lg:w-auto hover:bg-white hover:text-black">
              Купи сега
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
{/* Апел за действие */}
<section className="bg-[#8DBAEC] py-20 relative overflow-hidden italic text-black">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond-dark.png')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-serif mb-6">Присъедини се към нашия VIP списък</h2>
          <p className="text-text max-w-2xl mx-auto mb-12 text-lg">
            Бъдете първите, които ще получат достъп до нашите ексклузивни колекции за Свети Валентин и 8-ми март. 
            Получавайте персонализирани препоръки и VIP-ексклузивни отстъпки.
          </p>
          <div className="max-w-md mx-auto bg-background p-1 rounded-full backdrop-blur-sm mb-8">
            <div className="flex">
              <input 
                type="email"
                placeholder="Въведете вашата имейл адреса"
                className="flex-1 bg-transparent px-6 py-3 text-text focus:outline-none"
                value={email} // Bind the input value to the email state
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              />
              <button 
                onClick={handleEmailSubmit} // Call handleEmailSubmit on button click
                className="bg-black text-white px-2 py-2 md:px-8 md:py-3 rounded-full font-medium"
              >
                Присъедини се към VIP клуба
              </button>
            </div>
          </div>
          <p className="text-sm text-text">
            ✨ Ексклузивен достъп | 🎁 Специални оферти | 💝 VIP събития
          </p>
        </div>
      </section>
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-row justify-between items-start gap-8">
          <div></div>
            <div>
              <h3 className="text-xl font-serif mb-4 text-white font-bold">Елегантни Бижута</h3>
              <p className="text-white">Създаваме безвременни бижута от 1990 г.</p>
            </div>
            <div>
              <h4 className="text-lg mb-4 text-white font-bold">Бързи линкове</h4>
              <ul className="space-y-2 text-white">
                <li><a href="/shipping" className="hover:text-hover">Информация за доставка</a></li>
                <li><a href="/returns" className="hover:text-hover">Възстановяване</a></li>
                <li><a href="/care" className="hover:text-hover">Позабота за бижутата</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4 text-white font-bold">Свържи се с нас</h4>
              <address className="text-white not-italic">
                <p>123 улица на бижутата</p>
                <p>Ню Йорк, НЙ 10001</p>
                <p>Email: info@elegantgems.com</p>
              </address>
            </div>
            <div></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
