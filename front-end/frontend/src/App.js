import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import { RequireAuth, usePersistAuth } from "./modules/auth";

import ErrorPage from "./pages/Error";
import SuccessPage from "./pages/Success";
import { HomeIndexPage } from "./modules/home/index";
// import { MainLayout } from "./modules/common";
import RootLayout from "./pages/Root";

import EditAccountPage from "./pages/Account";
import NewBoard from "./pages/NewBoard";
import Register from "./modules/register/pages/Register";
import Login from "./modules/auth/pages/Login";
import { MemberViewPage } from "./pages/MemberView";
import { DashboardPage } from "./pages/Dashboard";
import { TakenTickets } from "./pages/TakenTickets";
import BoardsPage from "./pages/Boards";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./modules/auth/store/index";
import './App.css';

function Home() {
  const user = useSelector(selectCurrentUser);

  return !user ? <Outlet /> : <Navigate to={"/boards"} />;
}

const router = createBrowserRouter([
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <HomeIndexPage />,
          },
        ],
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
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
