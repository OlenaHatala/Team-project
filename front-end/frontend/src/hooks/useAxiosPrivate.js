import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken();
  const { accessToken } = useAuth();

  useEffect(()=>{

    const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error.response.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refreshToken();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            //todo delete consolo.log()
            console.log(`reject in responseIntercept: ${error}`);
            return Promise.reject(error);
        }
    );

    return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
    }

  },[accessToken, refreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
