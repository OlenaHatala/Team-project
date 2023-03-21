import { useDispatch } from "react-redux";
import { setUserInfo } from "../store";
import { fromServerToStore } from "../store/userObject";

export const useUpdateUserStore = () => {
  const dispatch = useDispatch();

  const updateUserStore = (userData) => {
    dispatch(setUserInfo({user: fromServerToStore(userData)}));
  };
  return { updateUserStore };
};