import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { saveEmail } from "../lib/appwrite"; // Import Appwrite function

export default function HolidayPopup({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isClosed, setIsClosed] = useState(() => {
    return localStorage.getItem("holidayPopupClosed") === "true";
  });

  const [showCookies, setShowCookies] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString();

    try {
      await saveEmail({ email, date });
      handleClose();
    } catch (error) {
      console.error("Error saving email:", error.message);
    }
  };

  useEffect(() => {
    if (isClosed && localStorage.getItem("cookiesAccepted") !== "true") {
      setTimeout(() => setShowCookies(true), 500); // Delay for smooth transition
    }
  }, [isClosed]);

  if (!isOpen || isClosed) return showCookies ? <CookieConsent /> : null;

  const handleClose = () => {
    setIsClosed(true);
    localStorage.setItem("holidayPopupClosed", "true");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-background rounded-lg max-w-md w-full relative shadow-lg">
        <button onClick={handleClose} className="absolute right-4 top-4 text-text hover:text-discount">
          ✕
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-accent text-4xl mb-2">❤️</span>
            <h2 className="text-2xl font-serif text-text mb-2">
              Специални предложения за пролетта!
            </h2>
            <p className="text-text mb-4">
              Присъединете се към нашия списък за ексклузивни оферти и новини!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Въведете вашия имейл адрес"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accentbackground focus:border-accentbackground outline-none"
              required
            />
            <button type="submit" className="w-full bg-discount text-white py-3 rounded-lg transition-colors font-medium">
              Запишете се за специални оферти
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

// Cookie Consent Banner Component
function CookieConsent() {
  const [show, setShow] = useState(() => {
    return localStorage.getItem("cookiesAccepted") !== "true";
  });

  const acceptCookies = () => {
    setShow(false);
    localStorage.setItem("cookiesAccepted", "true");
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 right-4 bg-white text-gray-500 p-4 flex justify-between items-center z-20"
    >
      <p className="text-sm">
        Този уебсайт използва бисквитки, за да ви осигури най-доброто преживяване.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-pink-50 px-4 py-2 text-sm text-black transition"
      >
        Приемам
      </button>
    </motion.div>
  );
}
