import { createContext, useContext, useState } from "react";

export interface AuthContextType {
    username: string;
    setUsername: Function;
    isAuthenticated: boolean;
    setAuthenticated: Function;
    login: Function
    logout: Function
}

export const AuthContext = createContext<AuthContextType>({
    username: "",
    setUsername: () => { },
    isAuthenticated: false,
    setAuthenticated: () => { },
    login: () => { },
    logout: () => { }}
);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {

    function login(username: string, password: string) {
        // console.log(username)
        // console.log(password)
        if (username === "Toto" && password === "emeis2002") {
            setUsername(username)
            setAuthenticated(true)
            return true
        } else {
            return false
        }
    }

    function logout() {
        setUsername("")
        setAuthenticated(false)
    }

    const [username, setUsername] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);

    const authContext: AuthContextType = {
        username,
        isAuthenticated,
        setUsername,
        setAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
}
