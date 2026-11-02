import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    authAPI
      .me()
      .then((data) => {
        if (isMounted && data?.user) {
          setUser(data.user);
        } else if (isMounted) {
          setUser(null);
        }
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async ({ email, password }) => {
    setAuthError(null);
    try {
      const data = await authAPI.login({ email, password });
      setUser(data.user);
      return data.user;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const signup = async ({ username, email, password }) => {
    setAuthError(null);
    try {
      await authAPI.signup({ username, email, password });
      const loginData = await authAPI.login({ email, password });
      setUser(loginData.user);
      return loginData.user;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      setUser(null);
      setAuthError(null);
    }
  };

  const clearError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
