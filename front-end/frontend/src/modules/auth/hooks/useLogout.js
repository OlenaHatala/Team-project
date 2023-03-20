import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store";
import { useLogoutMutation } from "../api/authApiSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    const message = await logout().unwrap();
    dispatch(logOut());
    navigate("/");
  };
  return { loggingOut: isLoading, logout: logoutHandler };
};
