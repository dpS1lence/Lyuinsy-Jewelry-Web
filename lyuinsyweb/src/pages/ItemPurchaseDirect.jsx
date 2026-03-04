import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderSection from "../sections/OrderSection";
import { getAllItems, getOneItemBySlug } from "../lib/appwrite";
import OptimizedImage from "../components/OptimizedImage";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ExpandableText from "../components/ExpandableText";

const BGN_RATE = 1.95583;

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

  const handleToggleUpsell = (upsellItem) => {
    const isAdded = orderedItems.some((i) => i.$id === upsellItem.$id);
    if (isAdded) {
      setOrderedItems((prev) => prev.filter((i) => i.$id !== upsellItem.$id));
    } else {
      setOrderedItems((prev) => [...prev, upsellItem]);
    }
  };

  const orderData = { mainItem: item, orderedItems };

  /* Desktop vertical grid — shows added/not-added state */
  const UpsellGrid = () => (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
      {items.slice(0, 3).map((upsell) => (
        <div
          key={upsell.$id}
          className="flex flex-col bg-white border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative aspect-[4/3]">
            <OptimizedImage
              src={upsell.image}
              alt={upsell.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {upsell.oldPrice && upsell.oldPrice !== upsell.actualPrice && (
              <div className="absolute top-2 right-2 bg-discount text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">
                -
                {Math.round(
                  ((upsell.oldPrice - upsell.actualPrice) / upsell.oldPrice) *
                    100,
                )}
                %
              </div>
            )}
          </div>
          <div className="flex flex-col flex-grow p-4">
            <h4 className="text-xl font-serif text-text leading-tight mb-1 line-clamp-2">
              {upsell.name}
            </h4>
            <div className="mb-3">
              {upsell.oldPrice && upsell.oldPrice !== upsell.actualPrice && (
                <p className="text-xs text-gray-400 line-through">
                  {upsell.oldPrice.toFixed(2)} €
                </p>
              )}
              <p
                className={`text-lg font-bold ${upsell.oldPrice && upsell.oldPrice !== upsell.actualPrice ? "text-discount" : "text-black"}`}
              >
                {upsell.actualPrice.toFixed(2)} € /{" "}
                {(upsell.actualPrice * BGN_RATE).toFixed(2)} лв.
              </p>
            </div>
            {(() => {
              const isAdded = orderedItems.some((o) => o.$id === upsell.$id);
              return (
                <button
                  onClick={() => handleToggleUpsell(upsell)}
                  className={`mt-auto w-full text-sm font-semibold py-3 transition-colors ${
                    isAdded
                      ? "bg-discount text-white hover:bg-pink-600"
                      : "bg-black text-white hover:bg-discount"
                  }`}
                >
                  {isAdded ? "✓ Добавено — Премахни" : "+ Добави"}
                </button>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="px-4 xl:px-20 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row">
        {/* ════════════════════════════════════════
            LEFT COLUMN — product info + upsells
        ════════════════════════════════════════ */}
        <div className="w-full md:w-3/5 md:pr-8">
          {/* ── Product hero ── */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start my-6 md:my-8">
            {/* Images */}
            <div className="w-full md:w-1/2 flex flex-col-reverse gap-3">
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {(allImages.length > 3
                    ? allImages.slice(1, 4)
                    : allImages.slice(1)
                  ).map((image, index) => (
                    <OptimizedImage
                      key={index}
                      src={image}
                      alt={`Снимка ${index + 1}`}
                      className="w-20 h-20 md:w-24 md:h-24 shrink-0 object-cover cursor-pointer rounded shadow-sm hover:opacity-80 transition"
                      onClick={() => {
                        setPhotoIndex(index + 1);
                        setIsLightboxOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
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

            {/* Text info */}
            <div className="w-full md:w-1/2 flex flex-col">
              <h2 className="text-2xl md:text-3xl font-semibold text-text mb-3">
                {item.name}
              </h2>
              <ExpandableText text={item.description} />
              <p className="text-sm text-text mt-2">{item.deliveryDate}</p>
              <div className="mt-4 text-right">
                {item.oldPrice && item.oldPrice !== item.actualPrice && (
                  <p className="text-lg line-through text-gray-400 mb-0.5">
                    {item.oldPrice.toFixed(2)} € /{" "}
                    {(item.oldPrice * BGN_RATE).toFixed(2)} лв.
                  </p>
                )}
                <p
                  className={`text-3xl md:text-4xl font-thin ${item.oldPrice && item.oldPrice !== item.actualPrice ? "text-discount" : "text-black"}`}
                >
                  {item.actualPrice.toFixed(2)} € /{" "}
                  {(item.actualPrice * BGN_RATE).toFixed(2)} лв.
                </p>
                <p className="text-sm text-discount mt-1 font-medium">
                  Включва специална подаръчна кутия + изненада
                </p>
              </div>
            </div>
          </div>

          <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            index={photoIndex}
            slides={imagesForLightbox}
          />

          {/* ── Upsell section — desktop only (mobile has its own grid in the right column) ── */}
          {items && items.length > 0 && (
            <div className="hidden md:block mb-10">
              {/* Header */}
              <div className="mb-5 text-center">
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-text mb-2">
                  Ексклузивни ВИП Оферти!
                </h3>
                <p className="text-sm md:text-base text-gray-600 bg-accentbackground rounded-xl px-4 py-3 inline-block">
                  Налично{" "}
                  <span className="font-bold text-black">само при покупка</span>{" "}
                  — добавете сега и спестете!
                </p>
              </div>

              {/* Grid */}
              <UpsellGrid />
            </div>
          )}

          {/* Desktop sold-out message */}
          {items && items.length === 0 && (
            <p className="hidden md:block text-center py-8 text-text">
              Специалните оферти са изтекли!
            </p>
          )}
        </div>

        {/* ════════════════════════════════════════
            RIGHT COLUMN — form (upsells injected inside on mobile)
        ════════════════════════════════════════ */}
        <div className="w-full md:w-2/5">
          <OrderSection
            orderData={orderData}
            upsellItems={items || []}
            orderedUpsellIds={orderedItems.map((i) => i.$id)}
            onToggleUpsell={handleToggleUpsell}
          />
        </div>
      </div>
    </div>
  );
}
