import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogout = () => {
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    authLogout();
    navigate("/");
  };
  return logout;
};

export default useLogout;