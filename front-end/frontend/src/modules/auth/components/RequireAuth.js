import { useLocation, Navigate, Outlet } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import { useSelector } from "react-redux";
import { selectAuthLoadingState, selectCurrentToken } from "../store";

export const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const authLoading = useSelector(selectAuthLoadingState);
  const location = useLocation();

  const content = authLoading ? (
    <div
      styles={{
        minHeight: "700px",
        height: "700px",
        width: "100%",
        display: "flex",
        'justify-content': "center",
        'align-items': "center",
        'background-color': "black",
      }}
    >
      <CircularProgress sx={{marginBottom: '450px', marginInline: 'auto'}}/>
    </div>
  ) : token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );

  return content;
};
