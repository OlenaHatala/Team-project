import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
  console.log("PERSIST")
  const [isLoading, setIsLoading] = useState(true);
  const refreshToken = useRefreshToken();
  const { accessToken } = useAuth();
  const effectRun = useRef(false);

  useEffect(() => {
    if (effectRun.current === false) {
      const verifyRefreshToken = async () => {
        try {
          console.log("try await refresh");
          await refreshToken();
        } catch (err) {
          console.log("error in try await refresh:");
          console.error(err);
        } finally {
          console.log("finally in try await refresh");
          setIsLoading(false);
        }
      };
  
      !accessToken ? verifyRefreshToken() : setIsLoading(false);

      return () => {
        effectRun.current = true;
      }
    }


  }, [accessToken, setIsLoading, refreshToken]);

  //todo: remove effect for viewing access token in console after testing
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${accessToken.substring(460, 487)}`);
  }, [isLoading, accessToken]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;