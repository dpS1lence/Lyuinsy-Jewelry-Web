import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ScrollAnimation from "../components/ScrollAnimation";
import OrderSection from "../sections/OrderSection";
import { getAllItems, getOneItemBySlug } from "../lib/appwrite";
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
  const [loading, setLoading] = useState(true); // State for loading animation

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
        const data = await getOneItemBySlug(id); // Fetch the main item
        const dataAll = await getAllItems(); // Fetch all upsell items

        setItem(data);
        setItems(dataAll.filter(item => item['upsellOffer']));
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Зареждане...</p></div>; // Loading animation
  }

  if (!items) {
    return <div>Item not found</div>;
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
      <div className="px-5 xl:px-20 flex flex-col md:flex-row">
        {/* Main Item Section */}
        <div className="lg:w-3/5">
          <div className="flex flex-col justify-between items-start py-6 mb-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-5">{item.name}</h2>
            <div className="flex flex-col justify-center items-center md:flex-row w-full gap-8">
              <div className="relative md:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-96 md:max-w-full object-cover cursor-pointer shadow-sm hover:opacity-95 transition-opacity"
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
              <div className="flex flex-col justify-between md:w-1/2 h-max">
                <div className="flex flex-col items-start justify-center mt-6 md:mt-0">
                  <p className="text-base md:text-lg text-text mb-3 pr-5">{item.description}</p>
                  <p className="text-sm md:text-md text-text">{item.deliveryDate}</p>
                </div>
                <div className="flex flex-col items-end text-right mt-6 md:mt-0 pr-0 md:pr-6">
                  {item.oldPrice && (
                    <p className="text-lg line-through text-text mb-2">{item.oldPrice.toFixed(2)} лв</p>
                  )}
                  <p className="text-3xl md:text-4xl font-thin text-discount">{item.actualPrice.toFixed(2)} лв</p>
                </div>
                
                <p className="text-md text-center md:text-md p-2 text-discount mt-2">Включва специална подаръчна кутия + изненада</p>
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
              <h3 className="text-2xl font-semibold text-text mb-6">Добавени към поръчката:</h3>
              {orderedItems.map((orderedItem) => (
                <div key={orderedItem.$id} className="py-5 mb-6 bg-accentbackground p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative md:mr-6">
                  <button 
                    onClick={() => handleRemoveFromOrder(orderedItem)}
                    className="absolute top-3 right-3 text-text hover:text-discount transition-colors p-2 rounded-full hover:bg-accentbackground"
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
                        <h2 className="text-xl font-semibold text-text mb-3">{orderedItem.name}</h2>
                        <p className="text-md text-text mb-2">{orderedItem.description}</p>
                        <p className="text-sm text-text">{orderedItem.deliveryDate}</p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-end text-right pr-4">
                        {orderedItem.oldPrice && (
                          <p className="text-lg line-through text-text mb-2">{orderedItem.oldPrice.toFixed(2)} лв</p>
                        )}
                        <p className="text-3xl font-thin text-discount">{orderedItem.actualPrice.toFixed(2)} лв</p>
                        <p className="text-md text-text mt-2">Специално намаление!</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell Section */}
          <div className="mb-10">
            <div className="mb-10 text-center">
                <h3 className="text-4xl font-serif mb-6 text-text font-bold flex items-center justify-center">
                    Ексклузивни ВИП Оферти!
                </h3>
                <div className="flex justify-center items-center mb-8">
                    <div className="bg-accentbackground w-96 py-4  font-semibold text-md">
                        <p className="text-black">
                            Възползвайте се от нашите невероятни цени, налични само при покупка! 
                        </p>
                        <span className="font-bold text-black"> Добавете в количката сега и спестете!</span>
                    </div>
                </div>
            </div>
            {items && items.length > 0 ? (
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {items.slice(0, 3).map((upsell) => (
                    <div key={upsell.$id} className="flex flex-col h-full">
                      <div className="bg-background border overflow-hidden p-6 flex flex-col h-full">
                        <div className="relative aspect-[4/3] mb-6">
                          <img
                            src={upsell.image}
                            alt={upsell.name}
                            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                          />
                          {upsell.oldPrice && (
                            <div className="absolute top-4 right-4 bg-discount text-white px-3 py-1 rounded-full text-sm font-bold">
                              -{Math.round(((upsell.oldPrice - upsell.actualPrice) / upsell.oldPrice) * 100)}%
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className="text-2xl font-serif text-text mb-4">{upsell.name}</h4>
                          <div className="flex items-end gap-3 mb-4">
                            {upsell.oldPrice && (
                              <p className="text-lg text-text line-through">
                                {upsell.oldPrice.toFixed(2)} лв
                              </p>
                            )}
                            <p className="text-2xl font-thin text-discount">
                              {upsell.actualPrice.toFixed(2)} лв
                            </p>
                          </div>
                          <div className="bg-accentbackground rounded-lg p-4 mb-6">
                            <p className="text-sm text-text font-medium">
                              Добави преди да свърши!
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddToOrder(upsell)}
                          className="w-full bg-black text-white px-8 py-4 hover:bg-white border border-black hover:text-black transition-colors"
                        >
                          Добави
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-text">Специалните оферти са изтекли!</p>
              </div>
            )}
          </div>
        </div>

        {/* Existing Order Section */}
        <OrderSection orderData={orderData} />
      </div>
    </ScrollAnimation>
  )};