import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../lib/appwrite";
import { Databases } from "appwrite";


export default function HolidayCollectionSection() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const databases = new Databases();

    useEffect(() => {
        // Fetch items from Appwrite
        const fetchItems = async () => {
            try {
                const itemsFetch = await getAllItems();
                const filteredItems = itemsFetch; //.filter(item => item['collectionSpecialOffer']);
                setItems(filteredItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleReserveClick = (itemId) => {
        navigate(`/item-purchase-direct/${itemId}`);
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
            return (
              <div key={item.$id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                      <>
                        <span className="text-2xl font-light line-through text-gray-400">{item.oldPrice}лв</span>
                        <span className="text-2xl font-bold text-red-600">{item.actualPrice}лв</span>
                      </>
                    </div>
                    <button 
                      onClick={() => handleReserveClick(item.$id)}
                      className={`text-black px-6 py-2 mt-2 md:mt-0 rounded-full transition`}
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