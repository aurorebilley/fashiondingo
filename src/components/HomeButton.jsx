import React from "react";
import { Home } from "lucide-react";

export default function HomeButton({ setPage }) {
  return (
    <button className="home-button" onClick={() => setPage("home")}>
      <Home size={18} /> home
    </button>
  );
}
