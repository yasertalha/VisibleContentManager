// Typography.js
import React from "react";

export const Typography = ({ children, variant = "body", size = "m", color = "#000", ...props }) => {
  const fontSize = size === "s" ? "12px" : size === "m" ? "16px" : "20px";

  const tag =
    variant === "body"
      ? "p"
      : variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : "span"; // Default to span if no variant is matched

  return React.createElement(
    tag,
    {
      style: {
        fontSize,
        color,
        margin: 0,
        ...props.style,
      },
      ...props,
    },
    children
  );
};
