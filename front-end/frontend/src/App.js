import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from "./pages/Error";
import SuccessPage from "./pages/Success";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import EditAccountPage from "./pages/Account";
import AccountRootLayout from "./pages/AccountRoot";
import NewBoard from "./pages/NewBoard";
import RequireAuth from "./components/auth/RequireAuth";
import BoardOwnerView from './pages/BoardOwnerView';

const router = createBrowserRouter([
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {path: 'success', element: <SuccessPage />},
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "account",
        id: "user-detail",
        element: <AccountRootLayout />,
        children: [
          {
            index: true,
            element: <EditAccountPage />,
            loader: checkAuthLoader,
          }
        ],
      },
      {
        path: "boards",
        element: <RequireAuth />,
        children: [
          {
            path: "newboard",
            element: <NewBoard />,
          }
        ]
      }
    ],
  },




















  {path: 'board/dash/:boardId',
element: <BoardOwnerView />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
