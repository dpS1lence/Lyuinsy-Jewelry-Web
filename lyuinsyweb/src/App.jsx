import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ItemPurchaseDirect from "./pages/ItemPurchaseDirect";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import OrderConfirmation from "./pages/OrderConfirmation";
import TermsAndConditions from "./pages/TermsAndConditions";
import Shipping from "./pages/Shipping";
import ErrorPage from "./pages/ErrorPage";
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
            path: "/item/:id",
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
          {
            path: "/privacy",  
            element: <PrivacyPolicy />
          },
          {
            path: "/terms",  
            element: <TermsAndConditions />
          },
          {
            path: "/shipping",  
            element: <Shipping />
          },
          {
            path: "*",
            element: <ErrorPage />
          }
      ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;