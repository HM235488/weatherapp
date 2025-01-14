import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Map from "./Map.jsx";
import Favorites from "./Favorites.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "favorite_places",
        element: <Favorites />,
      },
    ],
  },
]);

export default router;
