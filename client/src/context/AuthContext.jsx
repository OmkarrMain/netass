import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem("netass_token"),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");

        if (active) {
          setUser(data.user || data);
        }
      } catch {
        localStorage.removeItem("netass_token");

        if (active) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, [token]);

  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    const newToken = data.token;

    if (!newToken) {
      throw new Error("Login response did not contain an authentication token");
    }

    localStorage.setItem("netass_token", newToken);
    setToken(newToken);

    const profile = data.user
      ? data.user
      : (
          await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          })
        ).data;

    setUser(profile.user || profile);

    return profile;
  }

  async function register(details) {
    const { data } = await api.post("/auth/register", details);
    const newToken = data.token;

    if (!newToken) {
      throw new Error(
        "Registration response did not contain an authentication token",
      );
    }

    localStorage.setItem("netass_token", newToken);
    setToken(newToken);

    const profile = data.user
      ? data.user
      : (
          await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          })
        ).data;

    setUser(profile.user || profile);

    return profile;
  }

  function logout() {
    localStorage.removeItem("netass_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
