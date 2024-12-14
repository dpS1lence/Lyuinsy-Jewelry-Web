import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ItemPurchaseDirect from "./pages/ItemPurchaseDirect";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import OrderConfirmation from "./pages/OrderConfirmation";
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
            element: <Collection />
          },
          {
            path: "/order-confirmation",
            element: <OrderConfirmation />
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