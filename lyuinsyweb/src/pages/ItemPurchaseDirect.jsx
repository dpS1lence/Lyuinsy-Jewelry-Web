import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ScrollAnimation from "../components/ScrollAnimation";
import OrderSection from "../sections/OrderSection";
import { getAllItems, getOneItem } from "../lib/appwrite";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ItemPurchaseDirect() {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null); // State for the main item
  const [items, setItems] = useState(null); // State for upsell items
  const [orderedItems, setOrderedItems] = useState([]); // State for ordered items
  const [currentUpsell, setCurrentUpsell] = useState(0); // Current upsell index
  const [arrowsVisible, setArrowsVisible] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Create array of all images (main item + upsell items)
  const allImages = item ? [
    { src: item.image },
    ...(item.additionalImages?.map(item => ({ src: item })) || [])
  ] : [];

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

  const handleRemoveFromOrder = (itemToRemove) => {
    // Remove from ordered items
    setOrderedItems((prevOrdered) => 
      prevOrdered.filter((item) => item.$id !== itemToRemove.$id)
    );
    
    // Add back to upsell items
    setItems((prevItems) => [...prevItems, itemToRemove]);
  };

  return (
    <ScrollAnimation>
      <div className="px-5 lg:px-32 py-20 flex flex-col md:flex-row">
        {/* Main Item Section */}
        <div className="lg:w-2/3">
          <div className="flex flex-row justify-between items-center py-6 mb-8 hover:bg-gray-50 transition-colors rounded-xl">
            <div className="flex flex-row w-3/4">
              <img
                src={item.image}
                alt={item.name}
                className="w-96 h-72 object-cover rounded-lg mr-6 cursor-pointer transform transition-transform duration-200 hover:scale-105 shadow-md"
                onClick={() => {
                  setPhotoIndex(0);
                  setIsLightboxOpen(true);
                }}
              />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-5">{item.name}</h2>
                <p className="text-lg text-gray-600 mb-3">{item.description}</p>
                <p className="text-md text-gray-500">{item.deliveryDate}</p>
              </div>
            </div>
            <div className="flex flex-col items-end text-right w-1/4 pr-6">
              {item.oldPrice && (
                <p className="text-lg line-through text-gray-400 mb-2">{item.oldPrice.toFixed(2)} лв</p>
              )}
              <p className="text-4xl font-extrabold text-emerald-700">{item.actualPrice.toFixed(2)} лв</p>
              <p className="text-md text-gray-600 mt-2">Специално намаление!</p>
            </div>
          </div>

          {/* Add Lightbox component */}
          <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            index={photoIndex}
            slides={allImages}
          />

          {/* Order Container */}
          {orderedItems.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Добавени към поръчката:</h3>
              {orderedItems.map((orderedItem) => (
                <div key={orderedItem.$id} className="flex flex-row justify-between items-center py-5 mb-6 bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                  <button 
                    onClick={() => handleRemoveFromOrder(orderedItem)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                    aria-label="Remove item"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>

                  <div className="flex flex-row w-3/4">
                    <img
                      src={orderedItem.image}
                      alt={orderedItem.name}
                      className="w-28 h-28 object-cover rounded-lg mr-6 cursor-pointer transform transition-transform duration-200 hover:scale-105"
                    />
                    <div className="flex flex-col justify-center">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">{orderedItem.name}</h2>
                      <p className="text-md text-gray-600 mb-2">{orderedItem.description}</p>
                      <p className="text-sm text-gray-500">{orderedItem.deliveryDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right w-1/4 pr-4">
                    {orderedItem.oldPrice && (
                      <p className="text-lg line-through text-gray-400 mb-2">{orderedItem.oldPrice.toFixed(2)} лв</p>
                    )}
                    <p className="text-3xl font-extrabold text-emerald-700">{orderedItem.actualPrice.toFixed(2)} лв</p>
                    <p className="text-md text-gray-600 mt-2">Специално намаление!</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell Section */}
          <div className="px-12">
            <h3 className="text-3xl font-serif mb-10 text-gray-900 text-center">ВИП оферти! Добави само сега!</h3>
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentUpsell * 100}%)` }}
                >
                  {items.map((upsell) => (
                    <div key={upsell.$id} className="min-w-full lg:min-w-80 lg:w-[60rem] p-4">
                      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-8">
                        <img
                          src={upsell.image}
                          alt={upsell.name}
                          className="w-full h-64 object-cover rounded-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
                        />
                        <div className="mt-6">
                          <h4 className="text-2xl font-serif text-gray-900 mb-4">{upsell.name}</h4>
                          <div className="flex justify-between items-center mb-3">
                            {upsell.oldPrice && (
                              <p className="text-xl font-bold text-gray-800 line-through">
                                {upsell.oldPrice.toFixed(2)} лв
                              </p>
                            )}
                            <p className="text-2xl font-bold text-emerald-700">
                              {upsell.actualPrice.toFixed(2)} лв
                            </p>
                          </div>
                          <p className="text-md text-gray-500 mb-6">
                            Discounted price available for the next 5 minutes.
                          </p>
                          <div className="text-center">
                            <button
                              onClick={() => handleAddToOrder(upsell)}
                              className="bg-emerald-700 text-white px-8 py-3 rounded-full hover:bg-emerald-800 transition duration-300 transform hover:scale-105"
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
                <div className="flex justify-center gap-6 mt-8">
                  <button
                    onClick={handlePrevUpsell}
                    className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors shadow-sm hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                    className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors shadow-sm hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
  )};