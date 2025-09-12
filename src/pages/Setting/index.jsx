import React from "react";
import ThemeToggle from "../../components/ThemeToggle";

const Setting = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Settings</h2>
      <div style={{ marginTop: "15px" }}>
        <p>Toggle Theme:</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Setting;
