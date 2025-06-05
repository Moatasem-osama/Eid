import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      
     <main>

        <Outlet />
     </main>

      <Footer/>
    </>
  );
}
