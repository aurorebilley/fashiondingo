import React from "react";
import { motion } from "framer-motion";
import Doodle from "../components/Doodle";
import HomeButton from "../components/HomeButton";

const members = [
  ["Mimi Ourlet", "Répare les vestes avec des incantations et du fil vert.", "#FF9425"],
  ["Dada Velcro", "DJ de cabines d'essayage, spécialiste du bouton disparu.", "#A5B3CE"],
  ["Lulu Paillette", "Dessine des fleurs qui collent aux chaussures.", "#EADA24"],
  ["Jojo Zigzag", "Découpe les patrons en suivant ses rêves de midi.", "#78BE21"],
  ["Nina Fronce", "Collectionne les nuages, les broches et les malentendus.", "#CEB47E"],
  ["Baba Patch", "Grand mage du textile froissé et des lunettes rouges.", "#CBA052"]
];

export default function AboutPage({ setPage }) {
  return (
    <>
      <section className="page scrapbook">
        <HomeButton setPage={setPage} />
        <h2>Qui sommes-nous ?</h2>
        <p className="page-note">Un carnet collectif, un peu taché, où chaque profil a été collé avec une colle suspecte.</p>
        <div className="cloud c1">nuage zip</div>
        <div className="cloud c2">reves flous</div>
        <div className="member-grid">
          {members.map(([name, text, color], i) => (
            <motion.article className="member-card" key={name} style={{ "--card": color, rotate: `${[-4, 2, -1, 4, -3, 3][i]}deg` }} whileHover={{ scale: 1.06, rotate: 0 }}>
              <div className="fake-photo"><span>{name.slice(0, 2)}</span></div>
              <Doodle>{["✿", "★", "♡", "zz", "!!", "✂"][i]}</Doodle>
              <h3>{name}</h3>
              <p>{text}</p>
              <div className="mini-links"><a>site</a><a>insta</a><a>mail</a></div>
            </motion.article>
          ))}
        </div>
      </section>
      <style>{`
        .page-note { max-width: 620px; font-size: 1.2rem; background: rgba(255,255,255,.55); padding: 10px; border: 2px dashed #753BBD; }
        .member-grid { display: grid; gap: 24px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 34px; }
        .member-card { position: relative; min-height: 310px; background: var(--card); border: 4px dashed #171031; padding: 15px; box-shadow: 8px 8px 0 #1E22AA; border-radius: 39% 61% 50% 50% / 6% 9% 91% 94%; }
        .fake-photo { height: 138px; background: repeating-linear-gradient(45deg,#BBC7D6 0 10px,#CEB47E 10px 20px); border: 4px solid #171031; display:flex; align-items:center; justify-content:center; font-family: Griffy; font-size: 42px; color:#753BBD; }
        .mini-links { display:flex; gap:8px; flex-wrap:wrap; }
        .mini-links a { background:#EADA24; border:2px solid #171031; padding:2px 8px; }
        .cloud { position: absolute; background: white; border: 3px dashed #1E22AA; padding: 18px 28px; border-radius: 50%; animation: floaty 6s infinite; }
        .c1 { right: 8%; top: 26%; } .c2 { left: 5%; bottom: 8%; animation-delay: 1.5s; }

        @media (max-width: 900px) {
          .member-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
