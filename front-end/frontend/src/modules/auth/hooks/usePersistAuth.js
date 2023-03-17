import { useDispatch } from "react-redux";

import { useGetUserQuery } from "../api/authApiSlice";
import { setLoading, setUserInfo } from "../store";
import { fromServerToStore } from "../store/userObject";

export const usePersistAuth = () => {
  const dispatch = useDispatch();

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();

  if (isLoading) {
    dispatch(setLoading(true));
  }

  if (isSuccess) {
    dispatch(
      setUserInfo({
        user: fromServerToStore(user.user),
      })
    );
    dispatch(setLoading(false));
  }

  if (isError) {
    dispatch(setLoading(false));
  }
};
