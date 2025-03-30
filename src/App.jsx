import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import Congrat from "./components/congrat.jsx";
import Layout from "./components/Layout.jsx";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 🟢 هنا بنحط الـ Layout
    children: [
      { index: true, element: <Home /> }, // 🏠 الصفحة الرئيسية
      { path: "congrat", element: <Congrat /> }, // 🎉 صفحة التهنئة
    ],
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
