import { useNavigate } from "react-router-dom";
import Jewelry1 from "../assets/images/8.png";
import Jewelry2 from "../assets/images/6.png";
import Jewelry3 from "../assets/images/5.png";

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
  // Add more items as needed
];

export default function HolidayCollectionSection() {
  const navigate = useNavigate();

  const handleReserveClick = (item) => {
    console.log("Item clicked:", item);
    navigate({
      pathname: '/item-purchase-direct/' + item.id,
      state: { item },
    });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl font-serif mb-4">Колекция за Празници</h2>
          <p className="text-gray-600">
            <span className="mr-2">✨</span>
            Изключителни парчета за незабравими моменти
            <span className="ml-2">✨</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const hasDiscount = [0, 2, 4, 7].includes(index);
            const discountPercent = hasDiscount ? [30, 25, 35, 40][Math.floor(Math.random() * 4)] : 0;
            const discountPrice = hasDiscount ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;

            return (
              <div key={item.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  {hasDiscount && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {discountPercent}% ОТСТЪПКА
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{hasDiscount ? "Ограничено Време за Оферта" : "Ексклузивно Парче"}</p>
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                      {hasDiscount ? (
                        <>
                          <span className="text-2xl font-light line-through text-gray-400">{item.price}лв</span>
                          <span className="text-2xl font-bold text-red-600">{discountPrice}лв</span>
                        </>
                      ) : (
                        <span className="text-2xl font-semibold text-gray-800">${item.price}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => handleReserveClick(item)}
                      className={`${hasDiscount ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-700'} text-white px-6 py-2 mt-2 md:mt-0 rounded-full transition`}
                    >
                      Резервирай за Коледа
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}