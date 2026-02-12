import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = "http://localhost:3000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.clear();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔹 REGISTER
  const registerUser = async ({ username, email, password }) => {
    const res = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  };

  // 🔹 LOGIN
  const loginUser = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // save token
    localStorage.clear();
    localStorage.setItem("accessToken", data.accessToken);

    // fetch real profile
    const profileRes = await fetch(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    const profile = await profileRes.json();
    setUser(profile);
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
