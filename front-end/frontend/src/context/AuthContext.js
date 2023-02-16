import { createContext, useState } from "react";

const AuthContext = createContext({
    id: "",
    email: "",
    surname: "",
    name: "",
    accessToken: "",
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;