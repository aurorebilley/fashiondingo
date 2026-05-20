import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HomeButton from "../components/HomeButton";

const inviteBlocks = [
  ["spectacle défilé", "Une parade textile étrange, drôle, sonore, pleine de silhouettes impossibles."],
  ["ateliers", "Découpe, custom, badges, gribouillis et petits rituels de mode collective."],
  ["location de vêtements", "Dressing itinérant pour clips, performances, fêtes et photos floues."],
  ["commandes sur mesure", "Pièces uniques pensées comme des personnages à porter."]
];

export default function InvitePage({ setPage }) {
  return (
    <>
      <section className="page invite-page">
        <HomeButton setPage={setPage} />
        <h2>Nous inviter</h2>
        <div className="invite-grid">
          {inviteBlocks.map(([title, text], i) => (
            <motion.article className="invite-card" key={title} whileHover={{ y: -8, rotate: i % 2 ? -2 : 2 }}>
              <div className="poster-img"><Sparkles size={44} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <button>PDF</button>
            </motion.article>
          ))}
        </div>
      </section>
      <style>{`
        .invite-grid { display: grid; gap: 24px; grid-template-columns: repeat(4, minmax(0,1fr)); }
        .invite-card { border: 4px dashed #171031; background:#f6e7bf; box-shadow: 8px 8px 0 #753BBD; padding: 15px; min-height:390px; }
        .poster-img { height:150px; display:grid; place-items:center; background: radial-gradient(circle,#EADA24,#FF9425 60%,#DA291C); border:4px solid #171031; }
        .invite-card button { border: 4px solid #171031; background:#FF9425; color:#171031; padding: 13px 20px; box-shadow: 6px 6px 0 #753BBD; font-weight: 700; }

        @media (max-width: 900px) {
          .invite-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
