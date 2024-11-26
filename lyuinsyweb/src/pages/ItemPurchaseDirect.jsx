import { useLocation, useParams } from "react-router-dom";
import Jewelry1 from "../assets/images/8.png";
import Jewelry2 from "../assets/images/6.png";
import Jewelry3 from "../assets/images/5.png";
import { useEffect } from 'react';
import ScrollAnimation from "../components/ScrollAnimation";

const items = [
  {
    id: 1,
    title: "Celestial Diamond Ring",
    description: "A stunning diamond ring that captures the essence of the night sky.",
    price: 899,
    image: Jewelry1,
  },
  {
    id: 2,
    title: "Winter Frost Necklace",
    description: "A beautiful necklace that sparkles like fresh snow.",
    price: 1099,
    image: Jewelry2,
  },
  {
    id: 3,
    title: "Ruby Snowflake Pendant",
    description: "A unique pendant that combines elegance with a winter theme.",
    price: 799,
    image: Jewelry3,
  },
];

const upsellItems = [
  {
    id: 1,
    title: "Golden Star Choker",
    price: 499,
    image: Jewelry1,
  },
  {
    id: 2,
    title: "Crystal Dream Bangle",
    price: 299,
    image: Jewelry2,
  },
  {
    id: 3,
    title: "Rose Gold Snowfall Set",
    price: 399,
    image: Jewelry3,
  },
];

export default function ItemPurchaseDirect() {
  const { id } = useParams(); // Get the ID from the URL
  const item = items.find(item => item.id === parseInt(id)); // Find the item by ID

  if (!item) {
    return <div>Item not found</div>; // Handle case where item is not found
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, []);

  return (
    <ScrollAnimation>
    <div className="px-4 py-20 flex flex-col md:flex-row">
      {/* Main Item Section */}
      <div className="w-2/3">
        <div className="flex flex-col md:flex-row items-center mb-12">
          <img
            src={item.image}
            alt={item.title}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="md:ml-12 mt-6 md:mt-0">
            <h2 className="text-5xl font-serif mb-6 text-gray-900">{item.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{item.description}</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">${item.price}</p>
            <p className="text-gray-500 text-sm">
              An email will be sent to you for confirmation.
            </p>
          </div>
        </div>
  
        {/* Upsell Items with Timer and Discount */}
        <div className="px-12">
          <h3 className="text-3xl font-serif mb-8 text-gray-900">Limited Time Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upsellItems.map((upsell) => (
              <div
                key={upsell.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden p-6 transition transform hover:scale-105"
              >
                <img
                  src={upsell.image}
                  alt={upsell.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h4 className="text-xl font-serif text-gray-900 mb-2">
                    {upsell.title}
                  </h4>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-800 line-through">${upsell.price}</p>
                    <p className="text-xl font-bold text-emerald-700">${upsell.price - (upsell.price * 0.2)}</p>
                  </div>
                  <p className="text-sm text-gray-500">Discounted price available for the next 5 minutes.</p>
                  <div className="mt-4">
                    <button className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition duration-300">
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Order Section */}
      <div className="w-1/3bg-gray-50 p-8 border-l border-gray-100">
        <h3 className="text-3xl font-serif mb-6 text-gray-900">Complete Your Order</h3>
        <form className="space-y-6">
          {/* Promo Code */}
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your promo code"
              className="flex-1 px-6 py-3 border border-gray-300 rounded-l-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="bg-emerald-700 text-white px-8 py-3 rounded-r-full font-medium hover:bg-emerald-800 transition transform hover:scale-105">
              Apply
            </button>
          </div>
          
          {/* Contact Info */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-800"
            required
          />
  
          {/* Price Summary */}
          <div className="mt-6 bg-white p-6 rounded-lg">
            <div className="flex justify-between text-lg text-gray-700">
              <p>Delivery Cost:</p>
              <p>$10</p>
            </div>
            <div className="flex justify-between text-lg text-gray-700">
              <p>Discount:</p>
              <p>-$5</p>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between text-2xl font-bold text-gray-900">
              <p>Total:</p>
              <p>${item.price + 10 - 5}</p>
            </div>
          </div>
  
          {/* Confirm Order */}
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-full w-full font-medium text-lg transition duration-300">
            Confirm Order
          </button>
        </form>
      </div>
    </div>
    </ScrollAnimation>
  )};
  