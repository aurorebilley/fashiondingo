import React, { Component, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Mail,
  Minus,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Youtube
} from "lucide-react";
import AboutPage from "./pages/AboutPage";
import BuzzPage from "./pages/BuzzPage";
import HomePage from "./pages/HomePage";
import InvitePage from "./pages/InvitePage";
import PortfolioPage from "./pages/PortfolioPage";
import ShopPage from "./pages/ShopPage";
import "./styles.css";

const pages = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "Qui sommes-nous ?" },
  { id: "portfolio", label: "Portfolio" },
  { id: "shop", label: "Boutique" },
  { id: "invite", label: "Nous inviter" },
  { id: "buzz", label: "Cuti Buzz" }
];

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

function App() {
  const [page, setPage] = useState("home");
  const [playing, setPlaying] = useState(false);
  const Current = {
    home: HomePage,
    about: AboutPage,
    portfolio: PortfolioPage,
    shop: ShopPage,
    invite: InvitePage,
    buzz: BuzzPage
  }[page];

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

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Fashion Dingo render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="page">
          <h1>Fashion Dingo</h1>
          <p className="runtime-fallback">Le site a charge, mais une erreur d'interface bloque l'affichage. Regarde la console du navigateur pour le detail.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
