import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ScrollAnimation from "../components/ScrollAnimation";
import OrderSection from "../sections/OrderSection";
import { getAllItems, getOneItem } from "../lib/appwrite";

export default function ItemPurchaseDirect() {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null); // State for the main item
  const [items, setItems] = useState(null); // State for upsell items
  const [orderedItems, setOrderedItems] = useState([]); // State for ordered items
  const [currentUpsell, setCurrentUpsell] = useState(0); // Current upsell index
  const [arrowsVisible, setArrowsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setArrowsVisible(true);
    }

    window.scrollTo(0, 0);

    const fetchItems = async () => {
      try {
        const data = await getOneItem(id); // Fetch the main item
        const dataAll = await getAllItems(); // Fetch all upsell items

        setItem(data);
        setItems(dataAll);
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      }
    };

    fetchItems();
  }, [id]);

  useEffect(() => {
    const isScreenBig = window.innerWidth > 768; // Define a "big" screen
    if (items && items.length > 0 && (!isScreenBig || (isScreenBig && items.length > 3))) {
      const interval = setInterval(() => {
        setCurrentUpsell((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [items]);

  if (!items) {
    return <div>Collection not found</div>; // Show if collection is null
  }

  const handlePrevUpsell = () => {
    setCurrentUpsell((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextUpsell = () => {
    setCurrentUpsell((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Function to handle adding an item to the order
  const handleAddToOrder = (upsellItem) => {
    setOrderedItems((prevOrdered) => [...prevOrdered, upsellItem]);
    setItems((prevItems) => prevItems.filter((item) => item.$id !== upsellItem.$id));
  };

  // Prepare data to pass to OrderSection
  const orderData = {
    mainItem: item, // Main item data
    orderedItems: orderedItems // Selected upsell items
  };

  return (
    <ScrollAnimation>
      <div className="px-5 lg:px-32 py-20 flex flex-col md:flex-row">
        {/* Main Item Section */}
        <div className="lg:w-2/3">
          <div className="flex flex-row justify-between items-center py-4 mb-5">
            <div className="flex flex-row w-3/4">
              <img
                src={item.image}
                alt={item.name}
                className="w-80 h-60 object-cover rounded-lg mr-4"
              />
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 mb-5">{item.name}</h2>
                <p className="text-md text-gray-600 mb-1">{item.description}</p>
                <p className="text-sm text-gray-500">{item.deliveryDate}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-right w-1/4">
              {item.oldPrice && (
                <p className="text-sm line-through text-gray-400 mb-1">{item.oldPrice.toFixed(2)} лв</p>
              )}
              <p className="text-3xl font-extrabold text-emerald-700">{item.actualPrice.toFixed(2)} лв</p>
              <p className="text-sm text-gray-600">Специално намаление!</p>
            </div>
          </div>

          {/* Order Container */}
          {orderedItems.length > 0 && (
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Вашите поръчки:</h3>
              {orderedItems.map((orderedItem) => (
                <div key={orderedItem.$id} className="flex flex-row justify-between items-center py-4 mb-5 bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex flex-row w-3/4">
                    <img
                      src={orderedItem.image}
                      alt={orderedItem.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{orderedItem.name}</h2>
                      <p className="text-md text-gray-600 mb-1">{orderedItem.description}</p>
                      <p className="text-sm text-gray-500">{orderedItem.deliveryDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right w-1/4">
                    {orderedItem.oldPrice && (
                      <p className="text-sm line-through text-gray-400 mb-1">{orderedItem.oldPrice.toFixed(2)} лв</p>
                    )}
                    <p className="text-2xl font-extrabold text-emerald-700">{orderedItem.actualPrice.toFixed(2)} лв</p>
                    <p className="text-sm text-gray-600">Специално намаление!</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell Section */}
          <div className="px-12">
            <h3 className="text-3xl font-serif mb-8 text-gray-900">ВИП оферти! Добави само сега!</h3>
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentUpsell * 100}%)` }}
                >
                  {items.map((upsell) => (
                    <div key={upsell.$id} className="min-w-full lg:min-w-80 lg:w-[60rem] p-3">
                      <div className="bg-white rounded-lg shadow-sm border overflow-hidden p-6">
                        <img
                          src={upsell.image}
                          alt={upsell.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-4">
                          <h4 className="text-xl font-serif text-gray-900 mb-2">{upsell.name}</h4>
                          <div className="flex justify-between items-center">
                            {upsell.oldPrice && (
                              <p className="text-xl font-bold text-gray-800 line-through">
                                {upsell.oldPrice.toFixed(2)} лв
                              </p>
                            )}
                            <p className="text-xl font-bold text-emerald-700">
                              {upsell.actualPrice.toFixed(2)} лв
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Discounted price available for the next 5 minutes.
                          </p>
                          <div className="mt-4">
                            <button
                              onClick={() => handleAddToOrder(upsell)}
                              className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition duration-300"
                            >
                              Add to Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {arrowsVisible && (
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

        {/* Existing Order Section */}
        <OrderSection orderData={orderData} />
      </div>
    </ScrollAnimation>
  );
}