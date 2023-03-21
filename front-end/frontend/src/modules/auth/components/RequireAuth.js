import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAuthLoadingState, selectCurrentToken } from "../store";

export const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const authLoading = useSelector(selectAuthLoadingState);
  const location = useLocation();

  const content = authLoading ? (
    <p>loading...</p>
  ) : token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );

  return content;
};
