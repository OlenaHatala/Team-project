import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { refresh } = useAuth();

  const refreshToken = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    refresh(response.data.accessToken);
    return response.data.accessToken;
  };
  return refreshToken;
};

export default useRefreshToken;
