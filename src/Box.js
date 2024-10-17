// Box.js
import React from "react";

export const Box = ({ children, sx, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        ...sx, // Add custom styles via the sx prop
      }}
      {...props}
    >
      {children}
    </div>
  );
};
