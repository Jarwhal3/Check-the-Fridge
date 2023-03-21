import { Counter } from "./components/Counter";
import  FetchData  from "./components/FetchData";
import { Home } from "./components/Home";
import { IngredientList } from "./components/IngredientList";
import { AddIngredient } from "./components/AddIngredient";
import Recipe from "./components/RecipeBrowser/RecipeList";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/recipe-lookup',
    element: <Recipe />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/add-ingredient',
    element: <AddIngredient />
  }
];

export default AppRoutes;
