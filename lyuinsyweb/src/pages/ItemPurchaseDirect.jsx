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
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const savedTime = localStorage.getItem('upsellTimeRemaining');
    return savedTime ? parseInt(savedTime) : 5 * 60; // 5 minutes in seconds
  });
  const [isUpsellActive, setIsUpsellActive] = useState(() => {
    return localStorage.getItem('upsellActive') !== 'false';
  });

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

  useEffect(() => {
    if (timeRemaining > 0 && isUpsellActive) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          localStorage.setItem('upsellTimeRemaining', newTime.toString());
          if (newTime <= 0) {
            setIsUpsellActive(false);
            localStorage.setItem('upsellActive', 'false');
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isUpsellActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
      <div className="px-5 lg:px-32 md:py-20 flex flex-col md:flex-row">
        {/* Main Item Section */}
        <div className="lg:w-2/3">
          <div className="flex flex-col justify-between items-start py-6 mb-8 rounded-xl">
            
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-5">{item.name}</h2>
            <div className="flex flex-col justify-center items-center md:flex-row w-full gap-8">
              <div className="relative w-full md:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:max-w-md object-cover cursor-pointer shadow-sm hover:opacity-95 transition-opacity"
                  onClick={() => {
                    setPhotoIndex(0);
                    setIsLightboxOpen(true);
                  }}
                />
                <div 
                  className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-70 transition-all"
                  onClick={() => {
                    setPhotoIndex(0);
                    setIsLightboxOpen(true);
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col justify-between h-max">
                <div className="flex flex-col items-start justify-center mt-6 md:mt-0">
                  <p className="text-base md:text-lg text-gray-600 mb-3 pr-5">{item.description}</p>
                  <p className="text-sm md:text-md text-gray-500">{item.deliveryDate}</p>
                </div>
                <div className="flex flex-col items-end text-right mt-6 md:mt-0 pr-0 md:pr-6">
                  {item.oldPrice && (
                    <p className="text-lg line-through text-gray-400 mb-2">{item.oldPrice.toFixed(2)} лв</p>
                  )}
                  <p className="text-3xl md:text-4xl font-extrabold text-emerald-700">{item.actualPrice.toFixed(2)} лв</p>
                  <p className="text-sm md:text-md text-gray-600 mt-2">Специално намаление!</p>
                </div>
              </div>
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
                <div key={orderedItem.$id} className="py-5 mb-6 bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
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

                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={orderedItem.image}
                        alt={orderedItem.name}
                        className="md:w-48 object-cover rounded-lg mr-6 cursor-pointer transform transition-transform duration-200 hover:scale-105"
                      />
                      <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">{orderedItem.name}</h2>
                        <p className="text-md text-gray-600 mb-2">{orderedItem.description}</p>
                        <p className="text-sm text-gray-500">{orderedItem.deliveryDate}</p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-end text-right pr-4">
                        {orderedItem.oldPrice && (
                          <p className="text-lg line-through text-gray-400 mb-2">{orderedItem.oldPrice.toFixed(2)} лв</p>
                        )}
                        <p className="text-3xl font-extrabold text-emerald-700">{orderedItem.actualPrice.toFixed(2)} лв</p>
                        <p className="text-md text-gray-600 mt-2">Специално намаление!</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell Section */}
          <div className="px-4 md:px-8 lg:px-12">
            <h3 className="text-3xl font-serif mb-4 text-gray-900 text-center">ВИП оферти! Добави само сега!</h3>
            {isUpsellActive ? (
              <>
                <div className="flex justify-center items-center mb-8">
                  <div className="bg-red-100 text-red-800 px-6 py-3 rounded-lg font-bold text-xl animate-pulse">
                    Оставащо време: {formatTime(timeRemaining)}
                  </div>
                </div>
                <div className="mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.slice(0, 3).map((upsell) => (
                      <div key={upsell.$id} className="flex flex-col h-full">
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-6 flex flex-col h-full">
                          <div className="relative aspect-[4/3] mb-6">
                            <img
                              src={upsell.image}
                              alt={upsell.name}
                              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                            />
                            {upsell.oldPrice && (
                              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                -{Math.round(((upsell.oldPrice - upsell.actualPrice) / upsell.oldPrice) * 100)}%
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-grow">
                            <h4 className="text-2xl font-serif text-gray-900 mb-4">{upsell.name}</h4>
                            <div className="flex items-end gap-3 mb-4">
                              {upsell.oldPrice && (
                                <p className="text-lg font-medium text-gray-400 line-through">
                                  {upsell.oldPrice.toFixed(2)} лв
                                </p>
                              )}
                              <p className="text-3xl font-bold text-emerald-700">
                                {upsell.actualPrice.toFixed(2)} лв
                              </p>
                            </div>
                            <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                              <p className="text-sm text-emerald-800 font-medium">
                                Специална цена, валидна само следващите 5 минути!
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToOrder(upsell)}
                            className="w-full bg-emerald-700 text-white px-8 py-4 rounded-xl hover:bg-emerald-800 transition-all duration-300 transform hover:scale-[1.02] font-semibold text-lg shadow-lg hover:shadow-xl"
                          >
                            Добави към поръчката
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Специалните оферти са изтекли!</p>
              </div>
            )}
          </div>
        </div>

        {/* Existing Order Section */}
        <OrderSection orderData={orderData} />
      </div>
    </ScrollAnimation>
  )};