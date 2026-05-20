import React from "react";

export default function Doodle({ children, className = "" }) {
  return <span className={`doodle ${className}`}>{children}</span>;
}
