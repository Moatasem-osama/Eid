import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import Congrat from "./components/congrat.jsx";
import Layout from "./components/Layout.jsx";
const routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/congrat", element: <Congrat /> }, 
    ],
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
