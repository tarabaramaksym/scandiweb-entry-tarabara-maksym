import Category from "../components/Category/Category";
import NotFound from "../components/Errors/NotFound/NotFound";
import Product from "../components/Product/Product";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";

// routes are used in the app.js for the regular react-router-dom stuff
// and in the Layout/Header/Navigation to generate Navigation navbar
// noRender is needed to let it know if it need to generate field or no

export default [
  { path: "/", name: "all", Component: <Category categoryName="all" /> },
  { path: "/clothes", name: "clothes", Component: <Category categoryName="clothes" /> },
  { path: "/tech", name: "tech", Component: <Category categoryName="tech" /> },
  { path: "/cart", name: "cart", Component: <ShoppingCart />, noRender: true },
  { path: "/tech/:product", Component: <Product />, noRender: true },
  { path: "/clothes/:product", Component: <Product />, noRender: true },
  { path: "/:product", Component: <Product />, noRender: true },
  { path: "*", Component: <NotFound />, noRender: true }
];
