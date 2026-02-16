import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderSection from "../sections/OrderSection";
import { getAllItems, getOneItemBySlug } from "../lib/appwrite";
import OptimizedImage from "../components/OptimizedImage";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ExpandableText from "../components/ExpandableText";

export default function ItemPurchaseDirect() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [items, setItems] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const allImages = item ? [item.image, ...(item.additionalImages || [])] : [];
  const imagesForLightbox = item
    ? [
        { src: item.image },
        ...(item.additionalImages
          ? item.additionalImages.map((image) => ({ src: image }))
          : []),
      ]
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItems = async () => {
      try {
        const data = await getOneItemBySlug(id);
        const dataAll = await getAllItems(300, 0);

        setItem(data);
        setItems(dataAll.filter((item) => item["upsellOffer"]));
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Зареждане...</p>
      </div>
    );
  }

  if (!items) {
    return <div>Item not found</div>;
  }

  const handleAddToOrder = (upsellItem) => {
    setOrderedItems((prevOrdered) => [...prevOrdered, upsellItem]);
    setItems((prevItems) =>
      prevItems.filter((item) => item.$id !== upsellItem.$id),
    );

    // Smooth scroll to Main Item Section
    document
      .getElementById("orderitems")
      .scrollIntoView({ behavior: "smooth" });
  };

  const orderData = {
    mainItem: item,
    orderedItems: orderedItems,
  };

  const handleRemoveFromOrder = (itemToRemove) => {
    setOrderedItems((prevOrdered) =>
      prevOrdered.filter((item) => item.$id !== itemToRemove.$id),
    );

    setItems((prevItems) => [...prevItems, itemToRemove]);
  };

  return (
    <div className="px-5 xl:px-20 flex flex-col md:flex-row">
      {/* Main Item Section */}
      <div className="lg:w-3/5 md:pr-8">
        <div className="flex flex-col md:flex-row gap-8 items-start my-8">
          {/* Left Image Section */}
          <div className="md:w-1/2 flex flex-col-reverse gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(allImages.length > 3
                ? allImages.slice(1, 4)
                : allImages.slice(1)
              ).map((image, index) => (
                <OptimizedImage
                  key={index}
                  src={image}
                  alt={`Снимка на артикул ${index + 1}`}
                  className="w-full h-32 object-cover cursor-pointer shadow-sm hover:opacity-90 transition"
                  onClick={() => {
                    setPhotoIndex(index + 1);
                    setIsLightboxOpen(true);
                  }}
                />
              ))}
            </div>

            <OptimizedImage
              src={item.image}
              alt={item.name}
              className="w-full object-cover shadow-sm cursor-pointer hover:opacity-90 transition"
              onClick={() => {
                setPhotoIndex(0);
                setIsLightboxOpen(true);
              }}
            />
          </div>

          {/* Right Text Section */}
          <div className="md:w-1/2 flex flex-col md:justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-5">
              {item.name}
            </h2>
            <ExpandableText text={item.description} />
            <p className="text-sm md:text-md text-text">{item.deliveryDate}</p>

            {item.oldPrice && (
              <p className="text-lg text-right line-through text-text mb-2">
                {item.oldPrice.toFixed(2)} €
              </p>
            )}
            <p className="text-3xl text-right md:text-4xl font-thin text-discount">
              {item.actualPrice.toFixed(2)} €
            </p>

            <p
              id="orderitems"
              className="text-md text-right text-discount mt-2"
            >
              Включва специална подаръчна кутия + изненада
            </p>
          </div>
        </div>

        {/* Add Lightbox component */}
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={photoIndex}
          slides={imagesForLightbox}
        />

        {/* Order Container */}
        {orderedItems.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-text mb-6">
              Добавени към поръчката:
            </h3>
            {orderedItems.map((orderedItem) => (
              <div
                key={orderedItem.$id}
                className="py-5 mb-6 bg-accentbackground p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative md:mr-6"
              >
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
                    <OptimizedImage
                      src={orderedItem.image}
                      alt={orderedItem.name}
                      className="md:w-48 object-cover rounded-lg mr-6 cursor-pointer transform transition-transform duration-200 hover:scale-105"
                    />
                    <div className="flex flex-col justify-center">
                      <h2 className="text-xl font-semibold text-text mb-3">
                        {orderedItem.name}
                      </h2>
                      <p className="text-md text-text mb-2">
                        {orderedItem.description}
                      </p>
                      <p className="text-sm text-text">
                        {orderedItem.deliveryDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col items-end text-right pr-4">
                      {orderedItem.oldPrice && (
                        <p className="text-lg line-through text-text mb-2">
                          {orderedItem.oldPrice.toFixed(2)} €
                        </p>
                      )}
                      <p className="text-3xl font-thin text-discount">
                        {orderedItem.actualPrice.toFixed(2)} €
                      </p>
                      <p className="text-md text-text mt-2">
                        Специално намаление!
                      </p>
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
                  Възползвайте се от нашите невероятни цени, налични само при
                  покупка!
                </p>
                <span className="font-bold text-black">
                  {" "}
                  Добавете в количката сега и спестете!
                </span>
              </div>
            </div>
          </div>
          {items && items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {items.slice(0, 3).map((upsell) => (
                <div key={upsell.$id} className="flex flex-col h-full">
                  <div className="bg-background border overflow-hidden p-4 flex flex-col h-full">
                    <div className="relative aspect-[4/3] mb-6">
                      <OptimizedImage
                        src={upsell.image}
                        alt={upsell.name}
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                      />
                      {upsell.oldPrice && (
                        <div className="absolute top-4 right-4 bg-discount text-white px-3 py-1 rounded-full text-sm font-bold">
                          -
                          {Math.round(
                            ((upsell.oldPrice - upsell.actualPrice) /
                              upsell.oldPrice) *
                              100,
                          )}
                          %
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <h4 className="text-2xl font-serif text-text mb-4">
                        {upsell.name}
                      </h4>
                      <div className="flex items-end gap-3 mb-4">
                        {upsell.oldPrice && (
                          <p className="text-lg text-text line-through">
                            {upsell.oldPrice.toFixed(2)} €
                          </p>
                        )}
                        <p className="text-2xl font-thin text-discount">
                          {upsell.actualPrice.toFixed(2)} €
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
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-text">
                Специалните оферти са изтекли!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Existing Order Section */}
      <OrderSection orderData={orderData} />
    </div>
  );
}
