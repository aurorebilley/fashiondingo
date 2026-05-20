import { motion } from "framer-motion";

export default function CartoonDingo({ playing, setPage }) {
  return (
    <motion.button
      className={`dingo-character ${playing ? "dance" : ""}`}
      onClick={() => setPage("shop")}
      whileTap={{ scale: 0.94, rotate: 8 }}
      aria-label="ouvrir la boutique"
    >
      <span className="ear left" />
      <span className="ear right" />
      <span className="head">
        <span className="eye e1" />
        <span className="eye e2" />
        <span className="nose" />
      </span>
      <span className="body">
        <span className="stitch s1" />
        <span className="stitch s2" />
      </span>
      <span className="leg l1" />
      <span className="leg l2" />
      <span className="speech">shop moi!</span>
    </motion.button>
  );
}
