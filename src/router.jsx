import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Map from "./Map.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:city",
        // element: <Map />,
      },
    ],
  },
]);

export default router;
