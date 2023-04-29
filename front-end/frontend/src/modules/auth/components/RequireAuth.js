import { useLocation, Navigate, Outlet } from "react-router-dom";

import { LargeSizedLoader } from "../../common/components/LargeSizedLoader";

import { useSelector } from "react-redux";
import { selectAuthLoadingState, selectCurrentToken } from "../store";

export const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const authLoading = useSelector(selectAuthLoadingState);
  const location = useLocation();

  const content = authLoading ? (
    <LargeSizedLoader />
  ) : token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );

  return content;
};
