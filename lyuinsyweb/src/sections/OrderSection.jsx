import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const sitekeyRE = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function OrderSection({ orderData }) {
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [formData, setFormData] = useState({
        promoCode: '',
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaValue) {
            alert("Моля, попълнете ReCAPTCHA.");
            return;
        }

        // Calculate total price
        const mainItemPrice = orderData.mainItem?.actualPrice || 0;
        const orderedItemsPrice = orderData.orderedItems.reduce((total, item) => total + item.actualPrice, 0);
        const totalPrice = mainItemPrice + orderedItemsPrice + 10 - 5; // Adding delivery and discount

        // Send email logic here
        const emailData = {
            user_name: "John Doe",
            user_email: "buterflycspro@gmail.com",
            promoCode: formData.promoCode,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            items: [
                `totalPrice: ${totalPrice.toFixed(2)}; Main Item: ${orderData.mainItem?.name}, Image: ${orderData.mainItem?.image}, ID: ${orderData.mainItem?.$id}, Price: ${mainItemPrice.toFixed(2)} лв`,
                ...orderData.orderedItems.map(item => `Upsell Item: ${item.name}, Image: ${item.image}, ID: ${item.$id}, Price: ${item.actualPrice.toFixed(2)} лв`)
            ].join('\n'), // Join items for email
        };

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_jvj3h5g',       // Replace with your service ID
                'template_esalbsu',      // Replace with your template ID
                emailData,               // Replace with your email data object
                'WvI-vMKQArYdGRtOQ'      // Replace with your user ID
            );
            console.log("Email sent successfully:", response);

            // Redirect to the confirmation page with order data
            navigate('/order-confirmation', { state: { orderData, totalPrice } });
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Неуспешно изпращане на имейла.");
        }
    };

    // Calculate total price for display
    const mainItemPrice = orderData.mainItem?.actualPrice || 0;
    const orderedItemsPrice = orderData.orderedItems.reduce((total, item) => total + item.actualPrice, 0);
    const totalPrice = mainItemPrice + orderedItemsPrice + 10 - 5; // Adding delivery and discount

    return (
        <div className="lg:w-1/3 bg-gray-50 lg:p-8 border-l border-gray-100">
            <h3 className="text-3xl font-serif mb-6 text-gray-900">Завършете Вашата Поръчка</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Промо Код */}
                <div className=" flex flex-row">
                    <input
                        type="text"
                        name="promoCode"
                        placeholder="Промо код"
                        className="w-3/5 px-6 py-3 border border-gray-300 rounded-l-full text-gray-800 placeholder-gray-400"
                        onChange={handleInputChange}
                    />
                    <button className="w-2/5 bg-emerald-700 text-white px-2 lg:px-6 py-3 rounded-r-full font-medium hover:bg-emerald-800">
                        Приложи
                    </button>
                </div>
                
                {/* Контактна Информация */}
                <input
                    type="text"
                    name="name"
                    placeholder="Имена на кирилица"
                    className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
                    required
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Имейл"
                    className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
                    required
                    onChange={handleInputChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Телефонен Номер"
                    className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
                    required
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Адрес"
                    className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
                    required
                    onChange={handleInputChange}
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
                        <p>{totalPrice.toFixed(2)} лв</p> {/* Display dynamic total price */}
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
}

// PropTypes for validation
OrderSection.propTypes = {
    orderData: PropTypes.shape({
        mainItem: PropTypes.object.isRequired,
        orderedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
};