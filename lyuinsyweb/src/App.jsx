import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ItemPurchaseDirect from "./pages/ItemPurchaseDirect";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";

const collectionsData = [
  {
      id: 1,
      title: "Кралската Колекция",
      description: "Вечни произведения с безценни камъни и сложни дизайни, достойни за кралски особи.",
      image: "path/to/Jewelry1.jpg", // Replace with actual image path
      theme: "bg-purple-50",
      items: [
          {
              id: 101,
              title: "Диамантена огърлица",
              price: 4500,
              image: "path/to/necklace.jpg" // Replace with actual image path
          },
          {
              id: 102,
              title: "Рубинени обеци",
              price: 3200,
              image: "path/to/earrings.jpg" // Replace with actual image path
          },
          {
              id: 103,
              title: "Сапфирен пръстен",
              price: 2800,
              image: "path/to/ring.jpg" // Replace with actual image path
          }
      ]
  },
  {
      id: 2,
      title: "Модерна Елегантност",
      description: "Съвременни дизайни, които отразяват вашата уникалност и стил.",
      image: "path/to/Jewelry2.jpg", // Replace with actual image path
      theme: "bg-blue-50",
      items: [
          {
              id: 201,
              title: "Златна гривна с геометрични мотиви",
              price: 1500,
              image: "path/to/bracelet.jpg" // Replace with actual image path
          },
          {
              id: 202,
              title: "Сребърни обеци с изчистен дизайн",
              price: 900,
              image: "path/to/silver_earrings.jpg" // Replace with actual image path
          },
          {
              id: 203,
              title: "Колие с черни перли",
              price: 2200,
              image: "path/to/black_pearl_necklace.jpg" // Replace with actual image path
          }
      ]
  },
  {
      id: 3,
      title: "Романтична Колекция",
      description: "Нежни и изящни бижута, които разказват истории за любов.",
      image: "path/to/Jewelry3.jpg", // Replace with actual image path
      theme: "bg-pink-50",
      items: [
          {
              id: 301,
              title: "Колие със сърце от розово злато",
              price: 1200,
              image: "path/to/heart_necklace.jpg" // Replace with actual image path
          },
          {
              id: 302,
              title: "Пръстен с гравирано послание",
              price: 1800,
              image: "path/to/engraved_ring.jpg" // Replace with actual image path
          },
          {
              id: 303,
              title: "Обеци с циркониеви кристали",
              price: 600,
              image: "path/to/crystal_earrings.jpg" // Replace with actual image path
          }
      ]
  }
];

const router = createBrowserRouter([
  {
      path: "/",
      element: <Layout />,
      children: [
          {
            index: true,  
            element: <Home />
          },
          {
            path: "/home",  
            element: <Home />
          },
          {
            path: "/about",  
            element: <AboutUs />
          },
          {
            path: "/contacts",  
            element: <Contact />
          },
          {
            path: "/collections",  
            element: <Collections />
          },
          {
            path: "/item-purchase-direct/:id",
            element: <ItemPurchaseDirect />
          },
          {
            path: "/collection/:id",
            element: <Collection collections={collectionsData} />
          },
      ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;