import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "./useAuth";

const API_LOGOUT_URL = "/auth/logout";

const useLogout = () => {
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post(API_LOGOUT_URL, {
        withCredentials: true,
      });
    } catch (err) {
      if (err.response?.status !== 204) {
        throw err;
      }
    } finally {
      authLogout();
      navigate("/");
    }
  };
  return logout;
};

export default useLogout;
