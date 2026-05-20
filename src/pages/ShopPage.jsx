import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Scissors, Shirt, ShoppingBag, Upload, X } from "lucide-react";
import HomeButton from "../components/HomeButton";

const products = [
  ["Veste Mirage", "hauts", "Mimi", "82", "#753BBD"],
  ["Pantalon Tordu", "bas", "Jojo", "64", "#64A70B"],
  ["Carte CutiSort", "cartes", "Baba", "12", "#EADA24"],
  ["Sac Spirale", "accessoires", "Lulu", "38", "#FF9425"],
  ["Top Nuage", "hauts", "Nina", "52", "#A5B3CE"],
  ["Ceinture Grimoire", "accessoires", "Dada", "45", "#DA291C"]
];

export default function ShopPage({ setPage }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="page shop-page">
        <HomeButton setPage={setPage} />
        <div className="cart"><ShoppingBag size={19} /> panier: 03</div>
        <h2>Boutique dressing bizarre</h2>
        <div className="shop-layout">
          <aside className="filters">
            <h3><Scissors size={18} /> filtres</h3>
            {["categorie", "createur", "prix"].map((f) => <label key={f}>{f}<select><option>tout voir</option><option>tres special</option></select></label>)}
            <div className="admin-ui">
              <h3>admin fantome</h3>
              <input placeholder="titre produit" />
              <textarea placeholder="description" />
              <select><option>categorie</option></select>
              <button><Upload size={15} /> upload image</button>
              <button><Plus size={15} /> ajouter produit</button>
            </div>
          </aside>
          <div className="product-grid">
            {products.map((p, i) => (
              <motion.button className="product-card" key={p[0]} style={{ "--product": p[4], translate: `${i % 2 ? "0 28px" : "0 0"}` }} onClick={() => setSelected(p)} whileHover={{ scale: 1.05, rotate: i % 2 ? 2 : -2 }}>
                <span className="hanger">⌒</span>
                <div className="garment"><Shirt size={58} /></div>
                <h3>{p[0]}</h3>
                <p>{p[1]} · {p[2]}</p>
                <strong>{p[3]} €</strong>
              </motion.button>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {selected && (
            <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="product-modal" initial={{ scale: .8, rotate: -6 }} animate={{ scale: 1, rotate: 1 }} exit={{ scale: .8 }}>
                <button className="close" onClick={() => setSelected(null)}><X size={18} /></button>
                <div className="modal-gallery"><span /><span /><span /></div>
                <h3>{selected[0]}</h3>
                <p>Piece mockee, coupes bizarres, fils apparents, etiquette cousue main. Aucun paiement reel ici.</p>
                <button className="magic-button">ajouter au panier</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <style>{`
        .cart { position: fixed; z-index: 35; right: 20px; top: 86px; display:flex; align-items:center; gap:7px; padding:8px 12px; border: 3px dashed #1E22AA; background: #EADA24; box-shadow: 5px 5px 0 #DA291C; }
        .shop-layout { display:grid; grid-template-columns: 280px 1fr; gap: 28px; align-items:start; }
        .filters, .admin-ui, .product-card, .product-modal { border: 4px dashed #171031; background: rgba(255,255,255,.62); box-shadow: 8px 8px 0 #753BBD; padding: 15px; }
        .filters { position: sticky; top: 135px; background:#CEB47E; }
        .filters label { display:grid; gap:4px; margin: 10px 0; }
        select, input, textarea { width:100%; border: 3px inset #A5B3CE; background:#EADA24; padding: 7px; font-family: inherit; }
        .admin-ui { margin-top:18px; background:#A5B3CE; }
        .admin-ui button { margin-top:8px; width:100%; display:flex; gap:6px; align-items:center; justify-content:center; border:2px solid #171031; background:#78BE21; padding:8px; }
        .product-grid { display: grid; gap: 24px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .product-card { min-height: 285px; text-align:left; background: var(--product); color:#171031; position:relative; border-radius: 8px 19px 6px 24px; }
        .product-card:hover { box-shadow: 0 0 0 4px #EADA24, 0 0 25px #1E22AA, 8px 8px 0 #DA291C; animation: wobble .75s; }
        .hanger { position:absolute; top:-30px; left:50%; font-size:58px; color:#171031; }
        .garment { height: 130px; display:grid; place-items:center; background: rgba(255,255,255,.42); border:3px dotted #171031; }
        .modal-back { position: fixed; z-index: 80; inset:0; background:rgba(30,34,170,.48); display:grid; place-items:center; padding:20px; }
        .product-modal { width:min(560px, 92vw); background:#EADA24; position:relative; }
        .close { position:absolute; right:10px; top:10px; background:#DA291C; color:white; border:2px solid #171031; }
        .modal-gallery { display:grid; grid-template-columns: 2fr 1fr 1fr; gap:10px; height:160px; margin-bottom:15px; }
        .modal-gallery span { background: repeating-linear-gradient(135deg,#753BBD 0 12px,#FF9425 12px 24px); border:3px solid #171031; }
        .magic-button { border: 4px solid #171031; background:#FF9425; color:#171031; padding: 13px 20px; box-shadow: 6px 6px 0 #753BBD; font-weight: 700; }
        .magic-button:hover { box-shadow: 0 0 0 4px #EADA24, 0 0 25px #1E22AA, 8px 8px 0 #DA291C; animation: wobble .75s; }

        @media (max-width: 900px) {
          .shop-layout, .product-grid { grid-template-columns: 1fr; }
          .filters { position: relative; top:auto; }
          .product-card { translate: 0 0 !important; }
          .cart { top: 118px; right: 12px; }
        }
      `}</style>
    </>
  );
}
