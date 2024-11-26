import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ItemPurchaseDirect from "./pages/ItemPurchaseDirect";

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
            path: "/item-purchase-direct/:id",
            element: <ItemPurchaseDirect />
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