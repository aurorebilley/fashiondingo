import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import HomeButton from "../components/HomeButton";

export default function PortfolioPage({ setPage }) {
  return (
    <>
      <section className="page portfolio-page">
        <HomeButton setPage={setPage} />
        <div className="pdf-viewer">
          <div className="viewer-bar"><span>portfolio_final_vraiment_final.pdf</span><span>□ ×</span></div>
          <div className="paper-stack">
            <FileText size={90} />
            <h2>Portfolio</h2>
            <p>Défilés, vêtements mutants, installations cousues, photos de nuit et archives de cabines.</p>
            <motion.button className="magic-button" whileHover={{ scale: 1.08, rotate: -2 }}>ouvrir le portfolio</motion.button>
          </div>
        </div>
      </section>
      <style>{`
        .pdf-viewer { max-width: 900px; margin: 4vh auto; border: 5px ridge #753BBD; background:#BBC7D6; box-shadow: 13px 13px 0 #DA291C; }
        .viewer-bar { display:flex; justify-content:space-between; background:#1E22AA; color:white; padding:8px 12px; }
        .paper-stack { margin: 24px; min-height: 470px; border: 4px dashed #CBA052; background: #f7ecd0; display:grid; place-items:center; text-align:center; padding: 30px; background-image: radial-gradient(rgba(117,59,189,.18) 1px, transparent 1px); background-size: 12px 12px; }
        .magic-button { border: 4px solid #171031; background:#FF9425; color:#171031; padding: 13px 20px; box-shadow: 6px 6px 0 #753BBD; font-weight: 700; }
        .magic-button:hover { box-shadow: 0 0 0 4px #EADA24, 0 0 25px #1E22AA, 8px 8px 0 #DA291C; animation: wobble .75s; }
      `}</style>
    </>
  );
}
