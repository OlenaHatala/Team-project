import { Outlet } from "react-router-dom";

import { MainNavigation } from "../modules/navbar";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
