import React, { useState, useEffect } from "react";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import "../styles/components/ThemeToggle.css";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Save preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <span onClick={toggleTheme} style={{ fontSize: "20px", cursor: "pointer" }}>
      {darkMode ? <MoonOutlined /> : <BulbOutlined />}
    </span>
  );
};

export default ThemeToggle;
