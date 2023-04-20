import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RequireAuth, usePersistAuth } from "./modules/auth";

import ErrorPage from "./pages/Error";
import SuccessPage from "./pages/Success";
import { HomeIndexPage } from "./modules/home/index";
import { MainLayout } from "./modules/common";

import EditAccountPage from "./pages/Account";
import NewBoard from "./pages/NewBoard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { MemberViewPage } from "./pages/MemberView";
import { DashboardPage } from "./pages/Dashboard";
import { TakenTickets } from "./pages/TakenTickets";
import BoardsPage from "./pages/Boards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      { index: true, element: <HomeIndexPage /> },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      { path: "success", element: <SuccessPage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "tickets",
            element: <TakenTickets />,
          },
          {
            path: "newboard",
            element: <NewBoard />,
          },
          {
            path: "boards",
            element: <BoardsPage />,
          },
          {
            path: "/account",
            element: <EditAccountPage />,
          },
          {
            path: "/dashboard/:boardId",
            element: <DashboardPage />,
          },
          {
            path: "board/:boardId",
            element: <MemberViewPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  usePersistAuth();
  return <RouterProvider router={router} />;
}

export default App;
