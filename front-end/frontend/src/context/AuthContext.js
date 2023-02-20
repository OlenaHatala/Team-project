import { createContext, useReducer } from "react";

const defaultAuthState = {
  id: "",
  email: "",
  surname: "",
  name: "",
  mobileNum: "",
  accessToken: "",
};

const authReducer = (state, action) => {
  if (action.type === "SET") {
    return {
      id: action.user.id,
      email: action.user.email,
      surname: action.user.surname,
      name: action.user.name,
      mobileNum: action.user.mobileNum,
      accessToken: action.user.accessToken,
    };
  }

  if (action.type === "ACCOUNTINFO") {
    return {
      ...state,
      email: action.email,
      surname: action.surname,
      name: action.name,
      mobileNum: action.mobileNum,
    };
  }

  if (action.type === "LOGOUT") {
    return defaultAuthState;
  }

  if (action.type === "REFRESH") {
    return {
      ...state,
      accessToken: action.accessToken,
    };
  }

  return defaultAuthState;
};

const AuthContext = createContext({
  id: "",
  email: "",
  surname: "",
  name: "",
  mobileNum: "",
  accessToken: "",
});

export const AuthProvider = ({ children }) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );


  const setAuth = (auth) => {
    dispatchAuthAction({ type: "SET", user: auth });
  };

  const refresh = (accessToken) => {
    dispatchAuthAction({ type: "REFRESH", accessToken});
  };

  const logout = () => {
    dispatchAuthAction({ type: "LOGOUT"});
  };

  const setAccInfo = (accountInfo) => {
    dispatchAuthAction({
      type: "ACCOUNTINFO",
      email: accountInfo.email,
      surname: accountInfo.surname,
      name: accountInfo.name,
      mobileNum: accountInfo.mobileNum,
    });
  };

  const authContext = {
    authState,
    id: authState.id,
    email: authState.email,
    surname: authState.surname,
    name: authState.name,
    mobileNum: authState.mobileNum,
    accessToken: authState.accessToken,
    setAuth,
    setAccInfo,
    logout,
    refresh,
  }

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
