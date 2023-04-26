import { Outlet, useLocation } from "react-router-dom";

import { MainNavigation } from "../modules/navbar";
import Footer from "../modules/common/components/Footer/Footer";
import { useEffect, useState } from "react";

function RootLayout() {
  const location = useLocation();
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
