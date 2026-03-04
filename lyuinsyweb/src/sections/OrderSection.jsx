// import ReCAPTCHA from "react-google-recaptcha";
import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { purchaseItem } from "../lib/appwrite";
import { createOrder } from "../lib/appwrite";
import CheckoutButton from "../components/CeckoutButton";
import OptimizedImage from "../components/OptimizedImage";
import Lightbox from "yet-another-react-lightbox";
import card1 from "../assets/images/march-8-cards/1.png";
import card2 from "../assets/images/march-8-cards/2.png";
import card3 from "../assets/images/march-8-cards/3.png";
import card4 from "../assets/images/march-8-cards/6.png";

// const sitekeyRE = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function OrderSection({
  orderData,
  upsellItems = [],
  orderedUpsellIds = [],
  onToggleUpsell,
}) {
  // const [recaptchaValue, setRecaptchaValue] = useState(null);
  const checkoutRef = useRef(null);
  const [formData, setFormData] = useState({
    promoCode: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [promoApplied, setPromoApplied] = useState(false); // Track if promo is applied
  const [discount, setDiscount] = useState(0); // Track discount amount or percentage
  const [promoMessage, setPromoMessage] = useState(""); // Feedback message for promo code
  const navigate = useNavigate(); // Initialize useNavigate
  const [deliveryOption, setDeliveryOption] = useState("home"); // State for delivery option
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCardTitle, setSelectedCardTitle] = useState(""); // State to track selected card title
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const images = [
    { src: card1, title: "Ягоди" },
    { src: card2, title: "Розова с пожелание" },
    { src: card3, title: "цветя" },
    { src: card4, title: "ваза с птичка и цветя" },
  ];

  // const handleRecaptchaChange = (value) => {
  //   setRecaptchaValue(value);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoApplied) {
      setPromoMessage("Промо кодът вече е приложен.");
      return;
    }

    const enteredCode = formData.promoCode.trim().toUpperCase();
    if (enteredCode === "PROMO2026") {
      const itemsTotal =
        (orderData.mainItem?.actualPrice || 0) +
        orderData.orderedItems.reduce(
          (total, item) => total + item.actualPrice,
          0,
        );
      const calculatedDiscount = itemsTotal * 0.1; // 10% discount
      setDiscount(calculatedDiscount);
      setPromoApplied(true);
      setPromoMessage(
        "Промо кодът е успешно приложен! Получавате 10% отстъпка.",
      );
    } else {
      setPromoMessage("Невалиден промо код.");
    }
  };

  const handleDeliveryChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleCardSelection = (index) => {
    setSelectedCardTitle(images[index].title);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!recaptchaValue) {
    //   alert("Моля, попълнете ReCAPTCHA.");
    //   return;
    // }

    setIsLoading(true); // Set loading state to true

    try {
      // Calculate total price
      const mainItemPrice = orderData.mainItem?.actualPrice || 0;
      const orderedItemsPrice = orderData.orderedItems.reduce(
        (total, item) => total + item.actualPrice,
        0,
      );
      const deliveryFee = Math.max(
        0,
        mainItemPrice + orderedItemsPrice > 50
          ? 0.0
          : deliveryOption === "home"
            ? 4.8
            : 3,
      );
      const discountAmount = discount;
      const totalPriceValue =
        mainItemPrice + orderedItemsPrice + deliveryFee - discount;

      // Update inventory quantities
      await purchaseItem(orderData.mainItem.$id);
      for (const item of orderData.orderedItems) {
        await purchaseItem(item.$id);
      }

      // Prepare email data
      const emailData = {
        user_name: "John Doe",
        user_email: "buterflycspro@gmail.com",
        promoCode: promoApplied ? formData.promoCode : "Няма",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: deliveryOption + " - " + formData.address,
        items: [
          `Total Price: ${parseFloat(totalPriceValue)} €`,
          `Delivery Fee: ${deliveryFee} €`,
          `Discounts: -${discountAmount} €`,
          `Картичка: ${selectedCardTitle}`,
          `Main Item: ${orderData.mainItem?.name}, Image: ${
            orderData.mainItem?.image
          }, ID: ${orderData.mainItem?.$id}, Price: ${mainItemPrice.toFixed(
            2,
          )} €`,
          ...orderData.orderedItems.map(
            (item) =>
              `Upsell Item: ${item.name}, Image: ${item.image}, ID: ${
                item.$id
              }, Price: ${item.actualPrice.toFixed(2)} €`,
          ),
        ].join("\n"), // Join items for email
      };

      const orderDataArr = {
        userNames: formData.name,
        userAdress: deliveryOption + " - " + formData.address,
        userPhone: formData.phone,
        userEmail: formData.email,
        totalPrice: parseFloat(totalPriceValue),
        promoCode: promoApplied
          ? formData.promoCode + ` Kартичка: ${selectedCardTitle}`
          : `Няма промокод, картичка: ${selectedCardTitle}`,
        itemIds: [
          ...orderData.orderedItems.map((item) => item.$id),
          orderData.mainItem.$id,
        ], // Ensure itemIds is always an array
      };

      // Try to send email, but don't block order creation if it fails
      try {
        await emailjs.send(
          "service_jvj3h5g",
          "template_esalbsu",
          emailData,
          "WvI-vMKQArYdGRtOQ",
        );
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue with order creation even if email fails
      }

      // Create order in database
      await createOrder(orderDataArr);

      navigate("/order-confirmation", {
        state: {
          orderData,
          deliveryFee,
          discountAmount,
          totalPriceValue,
          formData,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const mainItemPrice = orderData.mainItem?.actualPrice || 0;
  const orderedItemsPrice = orderData.orderedItems.reduce(
    (total, item) => total + item.actualPrice,
    0,
  );
  const orderedItemsPriceNoDisc = orderData.orderedItems.reduce(
    (total, item) => total + (item.oldPrice || item.actualPrice),
    0,
  );
  const discountAmount = discount; // Fixed discount plus promo discount
  const BGN_RATE = 1.95583;

  const deliveryFee = Math.max(
    0,
    mainItemPrice + orderedItemsPrice > 50
      ? 0.0
      : deliveryOption === "home"
        ? 4.8
        : 3,
  );
  const totalPrice =
    mainItemPrice + orderedItemsPrice + deliveryFee - discountAmount;
  const totalPriceNoDiscount =
    (orderData.mainItem?.oldPrice || orderData.mainItem?.actualPrice || 0) +
    orderedItemsPriceNoDisc +
    deliveryFee -
    discountAmount;

  return (
    <>
      <div
        className="w-full md:p-6 md:border-l-4 border-dashed border-gray-100 mb-2"
        id="orderitems"
      >
        <h3 className="text-2xl md:text-3xl font-serif mb-5 text-text">
          Завършете Вашата Поръчка
        </h3>
        <form
          ref={checkoutRef}
          id="checkout-section"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Промо Код */}
          <div className="flex flex-col">
            <div className="flex flex-row">
              <input
                type="text"
                name="promoCode"
                placeholder="Промо код"
                className="w-3/5 px-4 py-3 text-base border border-gray-300 rounded-l-full text-text placeholder-gray-400 focus:outline-none focus:border-pink-400 transition"
                onChange={handleInputChange}
                disabled={promoApplied}
              />
              <button
                className={`w-2/5 px-2 py-3 rounded-r-full font-medium transition duration-300 ${
                  promoApplied
                    ? "bg-black text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-white hover:text-black border border-black"
                }`}
                onClick={handleApplyPromo}
                disabled={promoApplied} // Disable button if promo applied
              >
                Приложи
              </button>
            </div>
            {/* Promo Message */}
            {promoMessage && (
              <p
                className={`mt-2 text-center text-sm ${
                  promoApplied ? "text-text" : "text-discount"
                }`}
              >
                {promoMessage}
              </p>
            )}
          </div>

          {/* Контактна Информация */}
          <input
            type="text"
            name="name"
            placeholder="Имена на кирилица"
            className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl text-text focus:outline-none focus:border-pink-400 transition"
            required
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Имейл"
            className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl text-text focus:outline-none focus:border-pink-400 transition"
            required
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефонен Номер"
            className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl text-text focus:outline-none focus:border-pink-400 transition"
            required
            onChange={handleInputChange}
          />
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="address"
              placeholder="Адрес за доставка"
              className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl text-text focus:outline-none focus:border-pink-400 transition"
              required
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500 pl-1">
              *Доставка: 4.80€ (домашен адрес), 3€ (офис на Спиди) — БЕЗПЛАТНА
              над 50€
            </p>
          </div>

          {/* ── Mobile upsell list (injected here, after address) ── */}
          {upsellItems.length > 0 && (
            <div className="md:hidden">
              <div className="mb-2">
                <p className="text-sm font-bold text-text">
                  💎 Ексклузивни ВИП оферти — само при покупка!
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {upsellItems.slice(0, 3).map((upsell) => {
                  const isAdded = orderedUpsellIds.includes(upsell.$id);
                  return (
                    <div
                      key={upsell.$id}
                      className={`flex flex-row items-center rounded-xl overflow-hidden border-2 transition-colors ${
                        isAdded
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="relative w-16 h-16 shrink-0">
                        <OptimizedImage
                          src={upsell.image}
                          alt={upsell.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {upsell.oldPrice &&
                          upsell.oldPrice !== upsell.actualPrice && (
                            <div className="absolute top-1 left-1 bg-discount text-white px-1 py-0.5 rounded-full text-[9px] font-bold leading-none">
                              -
                              {Math.round(
                                ((upsell.oldPrice - upsell.actualPrice) /
                                  upsell.oldPrice) *
                                  100,
                              )}
                              %
                            </div>
                          )}
                        {isAdded && (
                          <div className="absolute inset-0 bg-pink-400/30 flex items-center justify-center">
                            <span className="text-white text-xl font-bold drop-shadow">
                              ✓
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0 px-2 py-1.5">
                        <p className="text-xs font-semibold text-text leading-tight line-clamp-2">
                          {upsell.name}
                        </p>
                        <p
                          className={`text-xs font-bold mt-0.5 ${upsell.oldPrice && upsell.oldPrice !== upsell.actualPrice ? "text-discount" : "text-black"}`}
                        >
                          {upsell.actualPrice.toFixed(2)} €
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onToggleUpsell(upsell)}
                        className={`shrink-0 mr-2 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                          isAdded
                            ? "bg-discount text-white hover:bg-pink-600"
                            : "bg-black text-white hover:bg-discount"
                        }`}
                      >
                        {isAdded ? "✓ Добавено" : "+ Добави"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <label
              className={`flex-1 flex items-center gap-3 cursor-pointer border-2 rounded-xl px-4 py-3 transition ${
                deliveryOption === "home"
                  ? "border-pink-400 bg-accentbackground"
                  : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name="deliveryOption"
                value="home"
                checked={deliveryOption === "home"}
                onChange={handleDeliveryChange}
                className="accent-discount"
              />
              <span className="text-sm font-semibold text-text">
                Домашен адрес — 4.80€
              </span>
            </label>
            <label
              className={`flex-1 flex items-center gap-3 cursor-pointer border-2 rounded-xl px-4 py-3 transition ${
                deliveryOption === "speedy"
                  ? "border-pink-400 bg-accentbackground"
                  : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name="deliveryOption"
                value="speedy"
                checked={deliveryOption === "speedy"}
                onChange={handleDeliveryChange}
                className="accent-discount"
              />
              <span className="text-sm font-semibold text-text">
                Офис Спиди — 3€
              </span>
            </label>
          </div>

          {/* Special Card Section
                <div>
                    <h3 className="text-2xl font-bold text-text mb-4">Избери картичка</h3>
                    <div className="flex justify-between">
                        {images.map((image, index) => (
                            <label key={index} className="w-1/4 p-2 cursor-pointer flex items-center flex-col-reverse">
                                <input
                                    type="radio"
                                    name="imageSelection"
                                    value={index}
                                    className="mr-2 accent-discount mt-2"
                                    onChange={() => handleCardSelection(index)}
                                />
                                <OptimizedImage src={image.src} alt={`Image ${index + 1}`} className="w-full h-auto" onClick={() => handleImageClick(index)} />
                            </label>
                        ))}
                    </div>
                </div> */}

          {/* ── Обобщение на Поръчката ── */}
          <div className="mt-4 bg-accentbackground rounded-2xl p-4">
            {/* Items list */}
            <div className="space-y-2 mb-3">
              {/* Main item */}
              <div className="flex items-center gap-3">
                <OptimizedImage
                  src={orderData.mainItem?.image}
                  alt={orderData.mainItem?.name}
                  className="w-10 h-10 object-cover rounded-lg shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-semibold text-text truncate">
                    {orderData.mainItem?.name}
                  </p>
                </div>
                <p className="text-sm font-bold text-black shrink-0">
                  {orderData.mainItem?.actualPrice?.toFixed(2)} €
                </p>
              </div>
              {/* Upsell items */}
              {orderData.orderedItems.map((oi) => (
                <div key={oi.$id} className="flex items-center gap-3">
                  <OptimizedImage
                    src={oi.image}
                    alt={oi.name}
                    className="w-10 h-10 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold text-text truncate">
                      {oi.name}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-discount shrink-0">
                    {oi.actualPrice.toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 mb-3"></div>
            <div className="flex justify-between text-lg text-text">
              <p>Цена за Доставка</p>
              <p>
                {deliveryFee.toFixed(2)}€ /{" "}
                {(deliveryFee * BGN_RATE).toFixed(2)} лв.
              </p>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-lg text-text">
                <p>Промо Отстъпка (10%)</p>
                <p className="text-discount">
                  -{discount.toFixed(2)}€ / -{(discount * BGN_RATE).toFixed(2)}{" "}
                  лв.
                </p>
              </div>
            )}
            <div className="border-t border-gray-300 my-3"></div>
            <div className="flex justify-between text-2xl text-text">
              <p>Общо:</p>
              <p
                className={
                  totalPriceNoDiscount !== totalPrice
                    ? "text-discount"
                    : "text-black"
                }
              >
                {totalPriceNoDiscount !== totalPrice && (
                  <span className="font-extralight text-text text-xl line-through mr-2">
                    {totalPriceNoDiscount.toFixed(2)} € /{" "}
                    {(totalPriceNoDiscount * BGN_RATE).toFixed(2)} лв.
                  </span>
                )}
                {totalPrice.toFixed(2)} € / {(totalPrice * BGN_RATE).toFixed(2)}{" "}
                лв.
              </p>
            </div>
          </div>

          {/* ReCAPTCHA Component */}
          {/* <ReCAPTCHA sitekey={sitekeyRE} onChange={handleRecaptchaChange} /> */}

          <div className="flex flex-col items-center mt-4">
            <button
              className="bg-black text-white w-full py-4 text-lg font-semibold hover:bg-discount border border-black hover:border-discount transition-colors rounded-xl"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Обработва се..." : "✓ Поръчай"}
            </button>
            <p className="text-center text-sm text-text mt-2">
              С натискането на бутона, вие се съгласявате с{" "}
              <a href="/terms" className="text-discount underline">
                Общите условия
              </a>{" "}
              и{" "}
              <a href="/privacy" className="text-discount underline">
                Политиката за поверителност
              </a>
              .
            </p>
          </div>
        </form>
      </div>
      <CheckoutButton checkoutRef={checkoutRef} />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={currentImageIndex}
      />
    </>
  );
}

OrderSection.propTypes = {
  orderData: PropTypes.shape({
    mainItem: PropTypes.object.isRequired,
    orderedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  upsellItems: PropTypes.array,
  orderedUpsellIds: PropTypes.arrayOf(PropTypes.string),
  onToggleUpsell: PropTypes.func,
};
