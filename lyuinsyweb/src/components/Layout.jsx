import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/images/Lyuinsyia.png";
import LogoNoText from "../assets/images/Lyuinsynotext.png";
import HolidayPopup from "./HolidayPopup";
import { useNavigate } from "react-router-dom";
import { saveEmail } from '../lib/appwrite'; // Import saveEmail function

export default function Layout() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [email, setEmail] = useState(''); // State for email input

  useEffect(() => { 
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
        setIsPopupOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 300); // Show header after scrolling 100px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  let navigate = useNavigate();
  
  const Home = () => {
    navigate({
        pathname: '/home'
    }); 
  };
  const Collections = () => {
    navigate({
        pathname: '/collections'
    }); 
  };
  const Us = () => {
    navigate({
        pathname: '/about'
    }); 
  };
  const Contact = () => {
    navigate({
        pathname: '/contacts'
    }); 
  };
  const Privacy = () => {
    navigate({
        pathname: '/privacy'
    }); 
  };
  const Terms = () => {
    navigate({
        pathname: '/terms'
    }); 
  };
  const Shipping = () => {
    navigate({
        pathname: '/shipping'
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
    <div className="flex flex-col max-w-full min-h-screen"> {/* Changed max-w-dvh to max-w-full */}
      <HolidayPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
      <header className="bg-background/50 hover:bg-background/70 transition-colors border-dashed border-spacing-8 border-b-4 border-gray-100">
        {/* Обявителен банер */}
        <div className="bg-discount text-white text-center py-2 px-4">
          <p className="text-sm font-medium animate-pulse">
            Специални предложения за Свети Валентин и 8-ми март! | Безплатна доставка на поръчки над 100лв
          </p>
        </div>

        {/* Банер с логото */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Бижута Люинси" className="w-52 hover:opacity-90 transition-opacity" />
          </div>
        </div>

        <div className="relative">
          <div className="container mx-auto md:px-4 pb-4 relative z-10">
            <nav className="flex flex-col md:flex-row md:items-center justify-center md:space-x-12 pb-5">
              <a onClick={Home} className="cursor-pointer text-text hover:text-hover transition-colors font-medium pl-5 mb-5 md:mb-0 md:pl-0">Начало</a>
              <a onClick={Collections} className="cursor-pointer text-text hover:text-hover transition-colors font-medium mb-5 md:mb-0 pl-5 md:pl-0">Колекции</a>
              <a onClick={Us} className="cursor-pointer text-text hover:text-hover transition-colors font-medium pl-5 mb-5 md:mb-0 md:pl-0">За нас</a>
              <a onClick={Contact} className="cursor-pointer text-text hover:text-hover transition-colors font-medium mb-5 md:mb-0 pl-5 md:pl-0">Контакт</a>
              <button onClick={Collections} className="px-8 py-2 ml-5 hidden md:flex md:ml-0 font-medium w-fit cursor-pointer lg:w-auto bg-pink-100 shadow-sm rounded-md text-black">
                Купи сега
              </button>
            </nav>
          </div>
        </div>
      </header>
      {/* <div className="absolute w-full top-[252px] z-20"> */}
        {/* Elegant Gold Accent Section */}
        {/* <section className="w-full bg-transparent py-0"> */}
          {/* <div className="container mx-auto text-center"> */}
            {/* <p className="text-sm text-yellow-800 font-serif tracking-wide italic">Изживей магията на ръчно изработените бижута</p> */}
          {/* </div> */}
        {/* </section> */}
      {/* </div> */}

      <motion.header
        id="animated-header"
        className={`fixed z-40 h-20 bg-white w-screen top-0 border-dashed border-b-4 border-gray-100 transition-transform ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
        initial={{ y: -100 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex flex-row items-center justify-between lg:justify-center w-full h-full">
          <a onClick={Home} className="cursor-pointer text-text font-medium pl-5">
            <img src={LogoNoText} className="h-16 w-16" alt="Бижута Люинси" />
          </a>
          <div className="flex flex-row justify-center mr-10">
            <a onClick={Home} className="cursor-pointer text-text font-medium pl-5">Начало</a>
            <a className="text-text font-medium pl-5">|</a>
            <a onClick={Collections} className="cursor-pointer text-text font-medium pl-5">Колекции</a>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow">
        <Outlet />
      </main>
{/* Апел за действие */}
<section className="bg-blue-300 py-20 relative overflow-hidden italic text-black">
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
                placeholder="Електронна поща"
                className="flex-1 bg-transparent min-w-44 md:min-w-64 px-6 py-3 text-text focus:outline-none"
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
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div></div>
            <div>
              <h3 className="text-xl font-serif mb-4 text-white font-bold">Lyuinsy Jewelry</h3>
              <p className="text-white">Всички права запазени 2025©</p>
            </div>
            <div>
              <h4 className="text-lg mb-4 text-white font-bold">Бързи линкове</h4>
              <ul className="space-y-2 text-white">
                <li><a onClick={Shipping} className="hover:text-hover cursor-pointer">Информация за доставка</a></li>
                <li><a onClick={Privacy} className="hover:text-hover cursor-pointer">Защита на личните данни</a></li>
                <li><a onClick={Terms} className="hover:text-hover cursor-pointer">Общи условия за ползване</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4 text-white font-bold">Свържи се с нас</h4>
              <address className="text-white not-italic">
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
