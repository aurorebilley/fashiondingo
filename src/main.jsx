import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Pause,
  Play,
  SkipBack,
  SkipForward
} from "lucide-react";
import instagramIcon from "./components/Instagram.svg";
import mailIcon from "./components/Mail.svg";
import youtubeIcon from "./components/Youtube.svg";
import socialBanner from "./components/banniere-reseau.webp";
import logoVideo from "./components/anim/logo site.webm";
import logoSafariVideo from "./components/anim/logo site.mp4";
import AboutPage from "./pages/AboutPage";
import BuzzPage from "./pages/BuzzPage";
import HomePage from "./pages/HomePage";
import InvitePage from "./pages/InvitePage";
import PortfolioPage from "./pages/PortfolioPage";
import ShopPage from "./pages/ShopPage";
import "./styles.css";

const musicModules = import.meta.glob("./components/music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default"
});

const radioTracks = Object.entries(musicModules)
  .map(([path, src]) => {
    const fileName = path.split("/").pop();
    const title = fileName.replace(/\.mp3$/i, "");

    return { title, src };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "fr", { sensitivity: "base" }));

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

function Nav() {
  const logoSrc = isSafari ? logoSafariVideo : logoVideo;

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-3 py-3 md:px-6">
      <div className="site-header-row">
        <div className="social-strip">
          <img className="social-banner" src={socialBanner} alt="" />
          <a href="mailto:contact@fashiondingo.com" aria-label="envoyer un mail"><img src={mailIcon} alt="" /></a>
          <a href="https://www.instagram.com/fashiondingo/" target="_blank" rel="noreferrer" aria-label="ouvrir Instagram"><img src={instagramIcon} alt="" /></a>
          <a href="https://www.youtube.com/@fashiondingo" target="_blank" rel="noreferrer" aria-label="ouvrir YouTube"><img src={youtubeIcon} alt="" /></a>
        </div>
        <video
          className="header-logo-video"
          src={logoSrc}
          aria-label="Fashion Dingo"
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          controls={false}
        />
      </div>
    </header>
  );
}

function MusicPlayer({ playing, setPlaying }) {
  const [mini, setMini] = useState(false);
  const [trackIndex, setTrackIndex] = useState(null);
  const audioRef = useRef(null);
  const shouldPlayRef = useRef(false);
  const currentTrack = trackIndex === null ? null : radioTracks[trackIndex];

  const playTrack = () => {
    shouldPlayRef.current = true;
    if (trackIndex === null) {
      setTrackIndex(Math.floor(Math.random() * radioTracks.length));
      return;
    }

    setPlaying(true);
    audioRef.current?.play().catch(() => setPlaying(false));
  };

  const pauseTrack = () => {
    shouldPlayRef.current = false;
    audioRef.current?.pause();
    setPlaying(false);
  };

  const changeTrack = (direction) => {
    shouldPlayRef.current = true;
    setTrackIndex((current) => {
      const baseIndex = current === null ? Math.floor(Math.random() * radioTracks.length) : current;
      return (baseIndex + direction + radioTracks.length) % radioTracks.length;
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || trackIndex === null || !shouldPlayRef.current) return;

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [trackIndex, setPlaying]);

  return (
    <motion.aside
      drag
      dragMomentum={false}
      className={`winamp ${mini ? "is-mini" : ""}`}
      initial={false}
      whileHover={{ scale: 1.02 }}
    >
      <div className="winamp-top">
        <span>FashionDingo.exe</span>
        <button onClick={() => setMini(!mini)} aria-label="minimize"><Minus size={15} /></button>
      </div>
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        preload="auto"
        onEnded={() => changeTrack(1)}
      />
      {!mini && (
        <>
          <div className="eq"><span /><span /><span /><span /><span /></div>
          <div className="track">♪ {currentTrack?.title ?? "Radio couture nocturne"}</div>
          <div className="winamp-buttons">
            <button onClick={() => changeTrack(-1)} aria-label="piste precedente"><SkipBack size={16} /></button>
            <button onClick={playing ? pauseTrack : playTrack} aria-label={playing ? "pause" : "play"}>
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <button onClick={() => changeTrack(1)} aria-label="piste suivante"><SkipForward size={16} /></button>
          </div>
        </>
      )}
    </motion.aside>
  );
}

const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
      <Nav />
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
