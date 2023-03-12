import axios from "../api/axios";
import useAuth from "./useAuth";

axios.defaults.withCredentials = true;

const useRefreshToken = () => {
  const { refresh } = useAuth();

  const refreshToken = async () => {
    console.log("useRefreshToken refresh");
    const response = await axios.get("/auth/refresh", {
      withCredentials: true
    });
    console.log("call refresh method of authCTX:");
    console.log(response.data.accessToken);
    console.log(refresh);
    refresh(response.data.accessToken);
    console.log("AFTER: call refresh method of authCTX");
    return response.data.accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;