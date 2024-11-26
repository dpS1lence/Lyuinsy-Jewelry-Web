import { useState } from 'react';

export default function HolidayPopup({ isOpen, onClose }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your email submission logic here
    console.log('Email submitted:', email);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-red-600 text-4xl mb-2">🎄</span>
            <h2 className="text-2xl font-serif text-gray-800 mb-2">Ексклузивен достъп за празници</h2>
            <p className="text-gray-600 mb-4">Присъединете се към нашия VIP списък за специални оферти за празници</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Въведете вашата имейл адреса"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Получете VIP достъп
            </button>
          </form>
          
          <p className="text-gray-500 text-sm text-center mt-4">
            🎁 Първите подписки получават 15% отстъпка 🎁
          </p>
        </div>
      </div>
    </div>
  );
}