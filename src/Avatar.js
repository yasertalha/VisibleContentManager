// Avatar.js
import React from "react";

export const Avatar = ({ src, size = "s", type = "number", ...props }) => {
  const avatarSize = size === "s" ? "32px" : size === "m" ? "48px" : "64px";

  return (
    <div
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: "50%",
        backgroundColor: "#475467",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size === "s" ? "12px" : "16px",
        ...props.style,
      }}
    >
      {type === "number" ? src : <img src={src} alt="avatar" style={{ borderRadius: "50%", width: "100%", height: "100%" }} />}
    </div>
  );
};
