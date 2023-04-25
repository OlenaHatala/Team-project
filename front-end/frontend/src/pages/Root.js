import { Outlet } from "react-router-dom";

import { MainNavigation } from "../modules/navbar";
import Footer from "../modules/common/components/Footer/Footer";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default RootLayout;
