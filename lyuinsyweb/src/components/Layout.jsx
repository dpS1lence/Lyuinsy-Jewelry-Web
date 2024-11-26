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
      
      {/* Announcement Banner */}
      <div className="bg-emerald-700 text-white text-center py-2 px-4">
        <p className="text-sm font-medium animate-pulse">
          🎄 Holiday Special: Free Shipping on Orders Over $100 | Use Code: HOLIDAY2023 ✨
        </p>
      </div>

      {/* Logo Banner */}
      <div className="bg-white py-4 flex justify-center">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Lyuinsy Jewelry" className="w-32 hover:opacity-90 transition-opacity" />
        </div>
      </div>

      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap items-center justify-center space-x-4 md:space-x-12">
            <a href="/home" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Home</a>
            <a href="/collections" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Collections</a>
            <a href="/about" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">About</a>
            <a href="/contact" className="text-gray-700 hover:text-emerald-700 transition-colors font-medium">Contact</a>
            <button className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition-colors">
              Shop Now
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>
{/* Call to Action */}
<section className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-serif mb-6">Join Our Holiday VIP List</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
            Be the first to access our exclusive holiday collections and special seasonal offers. 
            Receive personalized recommendations and VIP-only discounts.
          </p>
          <div className="max-w-md mx-auto bg-white/10 p-1 rounded-full backdrop-blur-sm mb-8">
            <div className="flex">
              <input 
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-6 py-3 text-white placeholder-gray-300 focus:outline-none"
              />
              <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition transform hover:scale-105">
                Join VIP Club
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            ✨ Exclusive Access | 🎁 Special Offers | 💝 VIP Events
          </p>
        </div>
      </section>
      <footer className="bg-emerald-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Elegant Gems</h3>
              <p className="text-emerald-100">Crafting timeless jewelry pieces since 1990</p>
            </div>
            <div>
              <h4 className="text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-emerald-100">
                <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
                <li><a href="/returns" className="hover:text-white">Returns</a></li>
                <li><a href="/care" className="hover:text-white">Jewelry Care</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Contact Us</h4>
              <address className="text-emerald-100 not-italic">
                <p>123 Jewelry Lane</p>
                <p>New York, NY 10001</p>
                <p>Email: info@elegantgems.com</p>
              </address>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
