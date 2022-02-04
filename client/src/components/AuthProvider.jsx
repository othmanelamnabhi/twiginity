import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticated: false,
    user: null,
  });

  useEffect(() => {
    fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        setAuthenticatedUser({
          authenticated: true,
          user: responseJson.user,
        });
      })
      .catch((error) => {
        setAuthenticatedUser({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }, []);

  const handleSignInClick = () => {
    window.open("/auth/twitter", "_self");
  };

  const handleLogoutClick = () => {
    window.open("/auth/logout", "_self");
    handleNotAuthenticated();
  };

  const handleNotAuthenticated = () => {
    setAuthenticatedUser({ authenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{ authenticatedUser, handleLogoutClick, handleSignInClick }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
