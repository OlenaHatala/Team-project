import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RequireAuth, usePersistAuth } from "./modules/auth";

import ErrorPage from "./pages/Error";
import SuccessPage from "./pages/Success";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";

import EditAccountPage from "./pages/Account";
import NewBoard from "./pages/NewBoard";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
      { index: true, element: <HomePage /> },
      { path: "success", element: <SuccessPage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "newboard",
            element: <NewBoard />,
          },
          {
            path: "/account",
            element: <EditAccountPage />,
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
