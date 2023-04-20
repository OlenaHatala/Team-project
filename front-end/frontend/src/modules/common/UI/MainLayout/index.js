import React from 'react'
import { Outlet } from "react-router-dom";

import { MainNavigation } from "../../../navbar";


const MainLayout = () => {
  return (
    <>
    <MainNavigation />
    <main>
      <Outlet />
    </main>
  </>
  )
}

export default MainLayout
