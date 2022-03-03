import { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticated: null,
    user: null,
  });

  const { authenticated } = authenticatedUser;

  const twitterId = authenticatedUser?.user?.twitterId;

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
        const authInfo = {
          authenticated: true,
          user: responseJson.user,
        };
        setAuthenticatedUser(authInfo);
      })
      .catch((error) => {
        setAuthenticatedUser({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }, []);

  const socket = authenticated
    ? io({
        autoConnect: false,
        query: {
          twitterId,
        },
      })
    : null;

  const handleSignInClick = () => {
    window.open("/auth/twitter", "_self");
  };

  const handleLogoutClick = (e, expired = false) => {
    expired
      ? window.open(`/auth/logout?session=expired`, "_self")
      : window.open(`/auth/logout`, "_self");
    handleNotAuthenticated();
  };

  const handleNotAuthenticated = () => {
    socket.disconnect();
    setAuthenticatedUser({ authenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        handleLogoutClick,
        handleSignInClick,
        socket,
        handleNotAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  let {
    authenticatedUser: { authenticated },
  } = useAuth();

  return authenticated === null ? null : authenticated ? children : <Navigate to='/' />;
}
