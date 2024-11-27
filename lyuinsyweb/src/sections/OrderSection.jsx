import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const sitekeyRE = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function OrderSection() {
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!recaptchaValue) {
          alert("Please verify that you are not a robot.");
          return;
        }
        // Proceed with form submission logic
      };

    return (
        <div className="lg:w-1/3 bg-gray-50 lg:p-8 border-l border-gray-100">
        <h3 className="text-3xl font-serif mb-6 text-gray-900">Завършете Вашата Поръчка</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Промо Код */}
          <div className="flex">
            <input
              type="text"
              placeholder="Въведете вашия промо код"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-l-full text-gray-800 placeholder-gray-400"
            />
            <button className="bg-emerald-700 text-white px-2 lg:px-6 py-3 rounded-r-full font-medium hover:bg-emerald-800">
              Приложи
            </button>
          </div>
          
          {/* Контактна Информация */}
          <input
            type="text"
            placeholder="Имена на кирилица"
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
            required
          />
          <input
            type="email"
            placeholder="Имейл"
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
            required
          />
          <input
            type="tel"
            placeholder="Телефонен Номер"
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
            required
          />
          <input
            type="text"
            placeholder="Адрес"
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
            required
          />
  
          {/* Обобщение на Цената */}
          <div className="mt-6 bg-white p-6 rounded-lg">
            <div className="flex justify-between text-lg text-gray-700">
              <p>Цена за Доставка:</p>
              <p>10лв</p>
            </div>
            <div className="flex justify-between text-lg text-gray-700">
              <p>Отстъпка:</p>
              <p>-5лв</p>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between text-2xl font-bold text-gray-900">
              <p>Общо:</p>
              <p>20лв</p>
            </div>
          </div>
  
          {/* ReCAPTCHA Component */}
          <ReCAPTCHA
            sitekey={sitekeyRE}
            onChange={handleRecaptchaChange}
          />

          {/* Потвърдете Поръчката */}
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-full w-full font-medium text-lg transition duration-300" type="submit">
            Потвърдете Поръчката
          </button>
        </form>
      </div>
    );
};