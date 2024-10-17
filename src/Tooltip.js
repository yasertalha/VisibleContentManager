// Tooltip.js
import React, { useState } from "react";

export const Tooltip = ({ children, content, placement = "bottom", darkMode = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: "absolute",
            bottom: placement === "bottom" ? "-40px" : "40px",
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
