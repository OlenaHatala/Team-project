import { Outlet, useLocation } from "react-router-dom";

import { MainNavigation } from "../modules/navbar";
import Footer from "../modules/common/components/Footer/Footer";
import { useEffect, useState } from "react";

function RootLayout() {
  const location = useLocation();
  return (
    <div
      styles={{
        height: "100%",
        background: location.pathname === "/" ? "black" : "red",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
