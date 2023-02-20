import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from "./pages/Error";
import SuccessPage from "./pages/Success";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { action as logoutAction } from "./pages/Logout";
import EditAccountPage from "./pages/Account";
import NewBoard from "./pages/NewBoard";
import RequireAuth from "./components/auth/RequireAuth";
<<<<<<< HEAD
import BoardOwnerView from './pages/BoardOwnerView';
=======
import PersistLogin from "./components/auth/PersistLogin";
>>>>>>> d46a7f8 (submit new board form)

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
    children: [
      { index: true, element: <HomePage /> },
      {path: 'success', element: <SuccessPage />},
      {
        path: "logout",
        action: logoutAction,
      },
      {
        element: <PersistLogin />,
        children: [
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
              }
            ]
          }
        ]
      },
    ],
  },




















  {path: 'board/dash/:boardId',
element: <BoardOwnerView />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
