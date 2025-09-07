import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // stores all registered users
  const [user, setUser] = useState(null); // currently logged-in user

  const signup = (name, email, password) => {
    // check if user already exists
    const exists = users.find((u) => u.email === email);
    if (exists) return false; // fail if email exists

    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    setUser(newUser); // log in immediately
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

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
