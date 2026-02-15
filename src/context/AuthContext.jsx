import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token and profile
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setAccessToken(storedToken);
    api
      .get("/user/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signup = async (name, email, password) => {
    const res = await api.post("/user/register", {
      username: name,
      email,
      password,
    });
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post(
      "/user/login",
      { email, password },
      { skipAuthRedirect: true }
    );
    const token = res.data?.accessToken;
    if (!token) throw new Error("Missing access token");
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    const profile = await api.get("/user/profile");
    setUser(profile.data);
    return true;
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, signup, login, logout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
