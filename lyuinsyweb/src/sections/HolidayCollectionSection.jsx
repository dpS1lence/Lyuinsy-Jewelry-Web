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
                const filteredItems = itemsFetch.filter(item => !item['upsellOffer']);
                setItems(filteredItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleReserveClick = (item) => {
      if(item.quantity > 0){
        console.log(item);
        navigate(`/item/${item.$id}`);
      }
    };

  return (
    <section className="py-10 bg-accentbackground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl font-serif mb-4 text-text">Колекция за Свети Валентин и 8-ми март</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            return (
              <div 
                key={item.$id} 
                className={`group bg-background overflow-hidden transition duration-300 ${item.quantity === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => handleReserveClick(item)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110 ${item.quantity === 0 ? 'filter grayscale' : ''}`}
                  />
                  {item.quantity === 0 && (
                    <div className="absolute inset-0 bg-accentbackground opacity-50 flex items-center justify-center">
                      <span className="text-black text-4xl font-bold">Изчерпана</span>
                    </div>
                  )}
                </div>
                <div className={`p-6 flex flex-col justify-items-center items-center text-center ${item.quantity === 0 ? 'bg-accentbackground opacity-50' : ''}`}>
                  <h3 className="text-md font-semibold mb-2 text-text">{item.name}</h3>
                  <h3 className="text-md mb-2 text-text">{item.description.split(' ').slice(0, 3).join(' ') + '...'}</h3>
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <span className="text-xl font-thin text-main">{item.actualPrice.toFixed(2)} лв</span>
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