import { useState } from 'react';
import { saveEmail } from '../lib/appwrite'; // Import appwriteConfig

export default function HolidayPopup({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isClosed, setIsClosed] = useState(false); // New state to track if the popup is closed

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const date = new Date().toISOString(); // Get the current datetime in ISO format

    try {
      await saveEmail({email, date});

      onClose();
    } catch (error) {
      console.error("Error saving email:", error.message); // Log only the error message
    }
  };

  if (!isOpen || isClosed) return null; // Check if the popup is closed

  const handleClose = () => {
    setIsClosed(true); // Set the closed state to true
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-md w-full relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-text hover:text-discount"
        >
          ✕
        </button>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-accent text-4xl mb-2">❤️</span>
            <h2 className="text-2xl font-serif text-text mb-2">Специални предложения за Свети Валентин и 8-ми март!</h2>
            <p className="text-text mb-4">Присъединете се към нашия списък за ексклузивни оферти и новини!</p>
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
            <button
              type="submit"
              className="w-full bg-discount text-white py-3 rounded-lg transition-colors font-medium"
            >
              Запишете се за специални оферти
            </button>
          </form>
          
          <p className="text-text text-sm text-center mt-4">
            🎉 Първите 50 подписки получават 20% отстъпка! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}