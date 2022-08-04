import Category from "../components/Category/Category";
import NotFound from "../components/Errors/NotFound/NotFound";
import Product from "../components/Product/Product";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import { fetchCategories } from "../services/products-service";

// routes are used in the app.js for the regular react-router-dom stuff
// and in the Layout/Header/Navigation to generate Navigation navbar
// render boolean is required to let the Navigation component know if it should render the route


const baseRoutes = [
  { path: "/cart", Component: <ShoppingCart /> },
  { path: "/:product", Component: <Product /> },
  { path: "*", Component: <NotFound /> }
]


const getRoutes = async () => {
  const categories = await fetchCategories();

  const routes = []

  // first category is always an index page, I assume the first category is always All
  routes.push({ path: `/`, name: categories[0].name, Component: <Category categoryName={categories[0].name} />, render: true });

  for (let i = 1; i < categories.length; i++) {
    const name = categories[i].name;
    routes.push({ path: `/${name}`, name: name, Component: <Category categoryName={name} />, render: true });
    routes.push({ path: `/${name}/:product`, Component: <Product /> });
  }

  return routes.concat(baseRoutes);
}


export default getRoutes;
