import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    setUsers(storedUsers);
    setUser(storedUser);
    setLoading(false);
  }, []);

  // Save users
  useEffect(() => {
    if (!loading) localStorage.setItem("users", JSON.stringify(users));
  }, [users, loading]);

  // Save current user
  useEffect(() => {
    if (!loading) localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user, loading]);

  const signup = (name, email, password) => {
    const exists = users.find((u) => u.email === email);
    if (exists) return false;

    const newUser = { name, email, password, avatar: "" };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return false;
    setUser(found);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
