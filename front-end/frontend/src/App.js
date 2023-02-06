import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from "./pages/Error";
import SuccessPage from "./pages/Success";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import EditAccountPage from "./pages/Account";
import { action as editAccountAction } from "./components/UserForm";
import AccountRootLayout from "./pages/AccountRoot";

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
    path: "auth",
    element: <AuthenticationPage />,
    errorElement: <ErrorPage />,
    action: authAction,
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
            action: editAccountAction,
            loader: checkAuthLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
