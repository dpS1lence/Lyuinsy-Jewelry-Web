import { useLocation, useParams } from "react-router-dom";
import Jewelry1 from "../assets/images/8.png";
import Jewelry2 from "../assets/images/6.png";
import Jewelry3 from "../assets/images/5.png";
import { useEffect } from 'react';
import ScrollAnimation from "../components/ScrollAnimation";
import { useState } from "react";
import OrderSection from "../sections/OrderSection";
import { getAllItems, getOneItem } from "../lib/appwrite";

export default function ItemPurchaseDirect() {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setitem] = useState(null); // Initialize state for collection
  const [items, setitems] = useState(null); // Loading state
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State for screen size
  const [currentUpsell, setCurrentUpsell] = useState(0); // State for current upsell index
  const [upsellItems, setUpsellItems] = useState([]); // State for upsell items

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const data = await getOneItem(id); // Await the promise
        const dataAll = await getAllItems();

        setitem(data);
        setitems(dataAll);
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      }
    };

    fetchitems();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1500);
    };

    // Set initial value and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      const interval = setInterval(() => {
        setCurrentUpsell((prev) => (prev === upsellItems.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isSmallScreen, upsellItems.length]);

  if (!items) {
    return <div>Collection not found</div>; // Show if collection is null
  }

  const handleReserveClick = (item) => {
    console.log(`Reserved: ${item.name}`);
  };

  const handlePrevUpsell = () => {
    setCurrentUpsell((prev) => (prev === 0 ? upsellItems.length - 1 : prev - 1));
  };

  const handleNextUpsell = () => {
    setCurrentUpsell((prev) => (prev === upsellItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <ScrollAnimation>
    <div className="px-4 py-20 flex flex-col md:flex-row">
      {/* Main Item Section */}
      <div className="w-2/3">
        <div className="flex flex-col md:flex-row items-center mb-12">
          <img
            src={item.image}
            alt={item.name}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
          />
          <div className="md:ml-12 mt-6 md:mt-0">
            <h2 className="text-5xl font-serif mb-6 text-gray-900">{item.name}</h2>
            <p className="text-lg text-gray-600 mb-4">{item.description}</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">{item.actualPrice}лв</p>
            <p className="text-gray-500 text-sm">
              An email will be sent to you for confirmation.
            </p>
          </div>
        </div>
  
        <div className="px-12">
            <h3 className="text-3xl font-serif mb-8 text-gray-900">Limited Time Offers</h3>
            <div className="relative max-w-5xl mx-auto">
                {isSmallScreen ? (
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentUpsell * 100}%)` }}
                        >
                            {items.map((upsell) => (
                                <div key={upsell.$id} className="min-w-full">
                                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden p-6">
                                        <img
                                            src={upsell.image}
                                            alt={upsell.name}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="mt-4">
                                            <h4 className="text-xl font-serif text-gray-900 mb-2">{upsell.name}</h4>
                                            <div className="flex justify-between items-center">
                                                <p className="text-xl font-bold text-gray-800 line-through">
                                                    {upsell.oldPrice}лв
                                                </p>
                                                <p className="text-xl font-bold text-emerald-700">
                                                    {upsell.actualPrice}лв
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Discounted price available for the next 5 minutes.
                                            </p>
                                            <div className="mt-4">
                                                <button className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition duration-300">
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {items.map((upsell) => (
                            <div
                                key={upsell.$id}
                                className="bg-white rounded-lg shadow-sm border overflow-hidden p-6 transition transform hover:scale-105"
                            >
                                <img
                                    src={upsell.image}
                                    alt={upsell.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="mt-4">
                                    <h4 className="text-xl font-serif text-gray-900 mb-2">{upsell.name}</h4>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xl font-bold text-gray-800 line-through">{upsell.oldPrice}лв</p>
                                        <p className="text-xl font-bold text-emerald-700">
                                            {upsell.actualPrice}лв
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Discounted price available for the next 5 minutes.
                                    </p>
                                    <div className="mt-4">
                                        <button className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition duration-300">
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {isSmallScreen && (
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={handlePrevUpsell}
                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={handleNextUpsell}
                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
  
      <OrderSection/>
    </div>
    </ScrollAnimation>
  )};



  