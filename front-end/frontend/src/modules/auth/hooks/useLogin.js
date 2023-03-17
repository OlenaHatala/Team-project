import { useDispatch } from "react-redux";
import { useLoginMutation } from "../api/authApiSlice";
import { setCredentials } from "../store";
import { fromServerToStore } from "../store/userObject";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const loginHandler = async ({ email, password }) => {
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          accessToken: userData.accessToken,
          user: fromServerToStore(userData.user),
        })
      );
      return { status: { ok: true } };
    } catch (err) {
      let errorMessage = "An error occurred";
      if (!err?.status) {
        errorMessage = "No Server Response";
      } else if (err.status === 400) {
        errorMessage = "Missing Username or Password";
      } else if (err.status === 401) {
        errorMessage = "Incorect Username or Password";
      } else {
        errorMessage = "An error occurred";
      }
      return { status: { ok: false }, error: errorMessage };
    }
  };
  return { isLoggingIn: isLoading, login: loginHandler };
};
