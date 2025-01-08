import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/apiClient";
import { jwtAuthApi } from "../api/authenticationAPI";

export interface AuthContextType {
  username: string;
  isAuthenticated: boolean;
  login: Function;
  logout: Function;
  token: string;
}

export const AuthContext = createContext<AuthContextType>({
  username: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: "",
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  //   async function login(username: string, password: string) {
  //     const baToken = "Basic " + window.btoa(username + ":" + password);

  //     try {
  //       const response = await basicAuthApi(baToken);
  //       console.log(response);
  //       if (response.status === 200) {
  //         setUsername(username);
  //         setAuthenticated(true);
  //         setToken(baToken);

  //         // apiClient.interceptors.request.use((config) => {
  //         //   config.headers.Authorization = baToken;
  //         //   return config;
  //         // });

  //         apiClient.defaults.headers.common["Authorization"] = baToken;
  //         apiClient.defaults.headers.common["Content-Type"] = "application/json";
  //         apiClient.defaults.headers.common["Origin"] = "http://localhost:5173";

  //         return true;
  //       } else {
  //         logout();
  //         return false;
  //       }
  //     } catch (error) {
  //       logout();
  //       return false;
  //     }
  //   }

  async function login(username: string, password: string) {
    try {
      const response = await jwtAuthApi(username, password);
      console.log(response);
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setUsername(username);
        setAuthenticated(true);
        setToken(jwtToken);

        // apiClient.interceptors.request.use((config) => {
        //   config.headers.Authorization = baToken;
        //   return config;
        // });

        apiClient.defaults.headers.common["Authorization"] = jwtToken;
        apiClient.defaults.headers.common["Content-Type"] = "application/json";

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setUsername("");
    setAuthenticated(false);
    setToken("");
  }

  const authContext = {
    username,
    isAuthenticated,
    login,
    logout,
    token,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
