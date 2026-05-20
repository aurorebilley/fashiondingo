import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Mail,
  Instagram,
  Youtube,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Minus,
  ShoppingBag,
  Sparkles,
  Upload,
  Plus,
  X,
  Shirt,
  Scissors,
  FileText
} from "lucide-react";
import "./styles.css";

const pages = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "Qui sommes-nous ?" },
  { id: "portfolio", label: "Portfolio" },
  { id: "shop", label: "Boutique" },
  { id: "invite", label: "Nous inviter" },
  { id: "buzz", label: "Cuti Buzz" }
];

const members = [
  ["Mimi Ourlet", "Répare les vestes avec des incantations et du fil vert.", "#FF9425"],
  ["Dada Velcro", "DJ de cabines d'essayage, spécialiste du bouton disparu.", "#A5B3CE"],
  ["Lulu Paillette", "Dessine des fleurs qui collent aux chaussures.", "#EADA24"],
  ["Jojo Zigzag", "Découpe les patrons en suivant ses rêves de midi.", "#78BE21"],
  ["Nina Fronce", "Collectionne les nuages, les broches et les malentendus.", "#CEB47E"],
  ["Baba Patch", "Grand mage du textile froissé et des lunettes rouges.", "#CBA052"]
];

const products = [
  ["Veste Mirage", "hauts", "Mimi", "82", "#753BBD"],
  ["Pantalon Tordu", "bas", "Jojo", "64", "#64A70B"],
  ["Carte CutiSort", "cartes", "Baba", "12", "#EADA24"],
  ["Sac Spirale", "accessoires", "Lulu", "38", "#FF9425"],
  ["Top Nuage", "hauts", "Nina", "52", "#A5B3CE"],
  ["Ceinture Grimoire", "accessoires", "Dada", "45", "#DA291C"]
];

const inviteBlocks = [
  ["spectacle défilé", "Une parade textile étrange, drôle, sonore, pleine de silhouettes impossibles."],
  ["ateliers", "Découpe, custom, badges, gribouillis et petits rituels de mode collective."],
  ["location de vêtements", "Dressing itinérant pour clips, performances, fêtes et photos floues."],
  ["commandes sur mesure", "Pièces uniques pensées comme des personnages à porter."]
];

function Doodle({ children, className = "" }) {
  return <span className={`doodle ${className}`}>{children}</span>;
}

function FloatingDecor() {
  const blobs = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 96}%`,
      top: `${Math.random() * 90}%`,
      delay: `${Math.random() * 4}s`,
      color: ["#753BBD", "#FF9425", "#EADA24", "#DA291C", "#1E22AA", "#78BE21"][i % 6]
    })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {blobs.map((b) => (
        <motion.span
          key={b.id}
          className="float-bit"
          style={{ left: b.left, top: b.top, background: b.color, animationDelay: b.delay }}
          animate={{ y: [0, -18, 8, 0], rotate: [0, 9, -8, 0] }}
          transition={{ duration: 7 + (b.id % 4), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Nav({ page, setPage }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-3 py-3 md:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="social-strip">
          <a aria-label="mail"><Mail size={19} /></a>
          <a aria-label="instagram"><Instagram size={19} /></a>
          <a aria-label="youtube"><Youtube size={20} /></a>
        </div>
        <nav className="nav-stickers">
          {pages.slice(1).map((item, i) => (
            <button key={item.id} onClick={() => setPage(item.id)} className={page === item.id ? "active" : ""} style={{ rotate: `${i % 2 ? 2 : -2}deg` }}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function MusicPlayer({ playing, setPlaying }) {
  const [mini, setMini] = useState(false);
  return (
    <motion.aside
      drag
      dragMomentum={false}
      className={`winamp ${mini ? "is-mini" : ""}`}
      initial={{ x: 22, y: 90 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="winamp-top">
        <span>FashionDingo.exe</span>
        <button onClick={() => setMini(!mini)} aria-label="minimize"><Minus size={15} /></button>
      </div>
      {!mini && (
        <>
          <div className="eq"><span /><span /><span /><span /><span /></div>
          <div className="track">♪ Radio couture nocturne 03</div>
          <div className="winamp-buttons">
            <button><SkipBack size={16} /></button>
            <button onClick={() => setPlaying(!playing)}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
            <button><SkipForward size={16} /></button>
          </div>
        </>
      )}
    </motion.aside>
  );
}

function CartoonDingo({ playing, setPage }) {
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

function HomePage({ setPage, playing }) {
  return (
    <section className="page home-page">
      <div className="desktop-room">
        <Doodle className="sun">✹</Doodle>
        <Doodle className="spiral">@@@</Doodle>
        <Doodle className="badge">club couture bizarre</Doodle>
        <div className="hero-copy">
          <p className="tiny-label">web grimoire / dressing fantome / 2004</p>
          <h1>Fashion Dingo</h1>
          <p>Collectif textile souterrain pour silhouettes qui dansent mal, objets cousus de travers et fêtes à paillettes nerveuses.</p>
        </div>
        <CartoonDingo playing={playing} setPage={setPage} />
        <button className="home-portal p1" onClick={() => setPage("about")}>album de famille</button>
        <button className="home-portal p2" onClick={() => setPage("invite")}>nous invoquer</button>
        <button className="home-portal p3" onClick={() => setPage("portfolio")}>ouvrir grimoire</button>
      </div>
    </section>
  );
}

function HomeButton({ setPage }) {
  return <button className="home-button" onClick={() => setPage("home")}><Home size={18} /> home</button>;
}

function AboutPage({ setPage }) {
  return (
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
  );
}

function PortfolioPage({ setPage }) {
  return (
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
  );
}

function ShopPage({ setPage }) {
  const [selected, setSelected] = useState(null);
  return (
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
  );
}

function InvitePage({ setPage }) {
  return (
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
  );
}

function BuzzPage({ setPage }) {
  return (
    <section className="page buzz-page">
      <HomeButton setPage={setPage} />
      <h2>Cuti Buzz</h2>
      <div className="buzz-window">
        <div className="viewer-bar"><span>cuti_buzz.html</span><span>♡ ? ×</span></div>
        <marquee>news fausses mais lumineuses · drop vendredi a 13h13 · atelier badges · radio dingo active</marquee>
        <p>Micro blog fictif du collectif, rempli d'annonces, de captures floues et de petites propheties textiles.</p>
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [playing, setPlaying] = useState(false);
  const Current = { home: HomePage, about: AboutPage, portfolio: PortfolioPage, shop: ShopPage, invite: InvitePage, buzz: BuzzPage }[page];
  return (
    <>
      <FloatingDecor />
      <Nav page={page} setPage={setPage} />
      <MusicPlayer playing={playing} setPlaying={setPlaying} />
      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0)" }} exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: .35 }}>
          <Current setPage={setPage} playing={playing} />
        </motion.main>
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
