import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import forestBg from "../components/fond/Front-Page-Forest-1920x1080.webp";
import islandBg from "../components/fond/Front-Page-Island-1920x1080.webp";
import partyBg from "../components/fond/Front-Page-Party-1920x1080.webp";
import scoobyBg from "../components/fond/Front-Page-Scooby-1920x1080.webp";
import streetBg from "../components/fond/Front-Page-Street-1920x1080.webp";
import dancerVideo from "../components/anim/perso coucou.webm";
import dancerSafariVideo from "../components/anim/perso-coucou.mp4";
import dancingVideo from "../components/anim/perso danse.webm";
import dancingSafariVideo from "../components/anim/perso danse.mp4";
import dancerShadow from "../components/anim/Shadow.webp";
import boutiqueButton from "../components/bouton/Boutique.svg";
import portfolioButton from "../components/bouton/Portfolio.svg";
import aboutButton from "../components/bouton/QuiSommesNous.svg";
import cutiBuzzButton from "../components/bouton/CutiBuzz.svg";
import inviteButton from "../components/bouton/NousInviter.svg";

const homeBackgrounds = [forestBg, islandBg, partyBg, scoobyBg, streetBg];
const homeButtonHover = (tilt = 2) => ({ y: -8, rotate: tilt });

export default function HomePage({ setPage, playing }) {
  const coucouVideoRef = useRef(null);
  const dancingVideoRef = useRef(null);
  const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const coucouSrc = isSafari ? dancerSafariVideo : dancerVideo;
  const dancingSrc = isSafari ? dancingSafariVideo : dancingVideo;
  const background = useMemo(
    () => homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)],
    []
  );
  const playDancerVideo = (dancer) => {
    if (!dancer) return;

    dancer.muted = true;
    dancer.defaultMuted = true;
    dancer.playsInline = true;
    dancer.play().catch(() => {});
  };
  const pauseDancerVideo = (dancer) => {
    if (!dancer) return;

    dancer.pause();
    dancer.currentTime = 0;
  };
  const loopDancerVideo = (event) => {
    event.currentTarget.currentTime = 0;
    event.currentTarget.play().catch(() => {});
  };
  const shouldPlayVideo = (isVisible) => isSafari || isVisible;

  useEffect(() => {
    if (isSafari) {
      playDancerVideo(coucouVideoRef.current);
      playDancerVideo(dancingVideoRef.current);
      return;
    }

    if (playing) {
      pauseDancerVideo(coucouVideoRef.current);
      playDancerVideo(dancingVideoRef.current);
      return;
    }

    pauseDancerVideo(dancingVideoRef.current);
    playDancerVideo(coucouVideoRef.current);
  }, [isSafari, playing]);

  return (
    <>
      <section className="page home-page" style={{ "--home-bg": `url(${background})` }}>
        <div className="desktop-room">
          <img className="home-dancer-shadow" src={dancerShadow} alt="" aria-hidden="true" />
          <video
            className={`home-dancer ${playing ? "is-hidden" : "is-visible"}`}
            ref={coucouVideoRef}
            src={coucouSrc}
            aria-label="ouvrir la boutique"
            aria-hidden={playing}
            autoPlay
            loop
            muted
            defaultMuted
            playsInline
            preload="auto"
            controls={false}
            role="button"
            tabIndex={playing ? -1 : 0}
            onCanPlay={(event) => {
              if (shouldPlayVideo(!playing)) playDancerVideo(event.currentTarget);
            }}
            onLoadedData={(event) => {
              if (shouldPlayVideo(!playing)) playDancerVideo(event.currentTarget);
            }}
            onEnded={loopDancerVideo}
            onClick={() => setPage("shop")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setPage("shop");
              }
            }}
          />
          <video
            className={`home-dancer ${playing ? "is-visible" : "is-hidden"}`}
            ref={dancingVideoRef}
            src={dancingSrc}
            aria-label="ouvrir la boutique"
            aria-hidden={!playing}
            autoPlay
            loop
            muted
            defaultMuted
            playsInline
            preload="auto"
            controls={false}
            role="button"
            tabIndex={playing ? 0 : -1}
            onCanPlay={(event) => {
              if (shouldPlayVideo(playing)) playDancerVideo(event.currentTarget);
            }}
            onLoadedData={(event) => {
              if (shouldPlayVideo(playing)) playDancerVideo(event.currentTarget);
            }}
            onEnded={loopDancerVideo}
            onClick={() => setPage("shop")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setPage("shop");
              }
            }}
          />
          <div className="home-left-buttons" aria-label="navigation secondaire">
            <button className="home-image-button portfolio-button" type="button" aria-label="portfolio" onClick={() => setPage("portfolio")}>
              <motion.img src={portfolioButton} alt="" whileHover={homeButtonHover(2)} />
            </button>
            <button className="home-image-button about-button" type="button" aria-label="qui sommes-nous" onClick={() => setPage("about")}>
              <motion.img src={aboutButton} alt="" whileHover={homeButtonHover(-2)} />
            </button>
          </div>
          <div className="home-right-buttons" aria-label="navigation secondaire">
            <button className="home-image-button buzz-button" type="button" aria-label="cuti buzz" onClick={() => setPage("buzz")}>
              <motion.img src={cutiBuzzButton} alt="" whileHover={homeButtonHover(2)} />
            </button>
            <button className="home-image-button invite-button" type="button" aria-label="nous inviter" onClick={() => setPage("invite")}>
              <motion.img src={inviteButton} alt="" whileHover={homeButtonHover(-2)} />
            </button>
          </div>
          <button
            className="home-boutique-button"
            type="button"
            aria-label="ouvrir la boutique"
            onClick={() => setPage("shop")}
          >
            <motion.img src={boutiqueButton} alt="" whileHover={homeButtonHover(2)} />
          </button>
        </div>
      </section>
      <style>{`
        .home-page {
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          overflow: hidden;
          padding: 0;
          background-image: var(--home-bg);
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          background-color: #171031;
        }
        main:has(.home-page) {
          height: 100vh;
          overflow: hidden;
        }
        body:has(.home-page) .social-strip {
          border: 0;
          background: transparent;
          box-shadow: none;
          padding: 0;
          gap: 5px;
        }
        body:has(.home-page) .social-banner {
          display: block;
          position: absolute;
          left: calc(50% + 16px);
          top: calc(50% + 12px);
          z-index: 0;
          width: 142px;
          height: auto;
          max-width: none;
          object-fit: contain;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        body:has(.home-page) .social-strip a {
          background: transparent;
          border: 0;
          min-width: 30px;
          min-height: 30px;
          color: #EADA24;
          filter: drop-shadow(2px 2px 0 #1E22AA) drop-shadow(-1px -1px 0 #DA291C);
        }
        body:has(.home-page) .social-strip a img {
          width: 27px;
          height: 27px;
        }
        body:has(.home-page) .winamp {
          width: 188px;
          right: 14px;
          bottom: 14px;
          left: auto;
          top: auto;
          overflow: hidden;
          padding: 6px 8px 8px;
          border: 1px solid rgba(73, 78, 91, .9);
          border-radius: 30px 40px 40px 30px / 44px 34px 34px 44px;
          background:
            radial-gradient(circle at 18% 24%, rgba(255,255,255,.96) 0 9px, transparent 10px),
            linear-gradient(145deg, rgba(255,255,255,.9) 0%, rgba(213,217,226,.96) 20%, rgba(137,144,157,.98) 49%, rgba(236,239,245,.98) 78%, rgba(162,168,180,.98) 100%);
          color: #eaf7ff;
          box-shadow:
            inset 0 2px 3px rgba(255,255,255,.95),
            inset 0 -6px 10px rgba(61,65,75,.32),
            0 6px 14px rgba(0,0,0,.24),
            2px 3px 0 rgba(30,34,170,.42);
          font-family: "Courier New", Courier, monospace;
          isolation: isolate;
        }
        body:has(.home-page) .winamp::before {
          content: "";
          position: absolute;
          inset: 4px 5px auto 8px;
          z-index: -1;
          height: 28px;
          border-radius: 999px 999px 45% 45%;
          background: linear-gradient(180deg, rgba(255,255,255,.72), rgba(255,255,255,0));
          pointer-events: none;
        }
        body:has(.home-page) .winamp::after {
          content: "";
          position: absolute;
          right: -12px;
          top: 9px;
          bottom: 9px;
          z-index: -1;
          width: 46px;
          border-left: 1px solid rgba(45,48,57,.42);
          border-radius: 50%;
          background: linear-gradient(90deg, rgba(255,255,255,.18), rgba(80,84,94,.18));
          pointer-events: none;
        }
        body:has(.home-page) .winamp.is-mini {
          width: 156px;
          padding: 5px 8px;
        }
        body:has(.home-page) .winamp-top {
          position: relative;
          z-index: 1;
          gap: 6px;
          min-height: 24px;
          padding: 0 0 4px 37px;
          background: transparent;
          color: rgba(48, 52, 62, .78);
          font-size: 9px;
          line-height: 1;
          text-shadow: 0 1px 0 rgba(255,255,255,.85);
          text-transform: uppercase;
          letter-spacing: 0;
        }
        body:has(.home-page) .winamp-top span {
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        body:has(.home-page) .winamp-top button {
          flex: 0 0 auto;
          min-width: 22px;
          min-height: 20px;
          border: 1px solid rgba(61,65,76,.72);
          border-radius: 999px;
          background:
            radial-gradient(circle at 32% 25%, rgba(255,255,255,.95), transparent 27%),
            linear-gradient(145deg, #f4f5f8 0%, #a8afbb 47%, #f2f4f7 100%);
          color: #424753;
          box-shadow:
            inset 1px 1px 2px rgba(255,255,255,.95),
            inset -2px -2px 3px rgba(72,77,89,.32),
            0 1px 2px rgba(0,0,0,.28);
        }
        body:has(.home-page) .winamp-top button:hover,
        body:has(.home-page) .winamp-buttons button:hover {
          filter: brightness(1.07);
        }
        body:has(.home-page) .winamp-top button:active,
        body:has(.home-page) .winamp-buttons button:active {
          transform: translateY(1px);
          box-shadow:
            inset 2px 2px 4px rgba(48,52,62,.4),
            inset -1px -1px 2px rgba(255,255,255,.78);
        }
        body:has(.home-page) .eq {
          display: none;
        }
        body:has(.home-page) .track {
          position: relative;
          z-index: 1;
          min-height: 34px;
          margin: 0 2px 7px 38px;
          padding: 7px 7px 5px;
          border: 4px solid #111319;
          border-radius: 6px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.38), rgba(255,255,255,0) 34%),
            linear-gradient(180deg, #5ed2ff 0%, #176fe8 48%, #082e9b 100%);
          color: #eefbff;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.18),
            inset 0 0 9px rgba(0,12,80,.7),
            0 0 8px rgba(58,177,255,.44),
            0 2px 2px rgba(0,0,0,.24);
          font-size: 10px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0;
          text-shadow: 0 0 4px rgba(255,255,255,.8), 1px 1px 0 rgba(0,0,90,.52);
        }
        body:has(.home-page) .track::after {
          content: "";
          position: absolute;
          inset: 3px 4px auto;
          height: 7px;
          border-radius: 999px;
          background: rgba(255,255,255,.38);
          pointer-events: none;
        }
        body:has(.home-page) .winamp-buttons {
          position: relative;
          z-index: 1;
          gap: 5px;
          padding: 0 4px 0 37px;
          align-items: center;
          justify-content: center;
        }
        body:has(.home-page) .winamp-buttons button {
          min-width: 26px;
          min-height: 25px;
          border: 1px solid rgba(56,60,70,.8);
          border-radius: 999px;
          background:
            radial-gradient(circle at 35% 24%, rgba(255,255,255,.98), transparent 28%),
            linear-gradient(145deg, #f9fafc 0%, #bbc2ce 42%, #7d8491 58%, #eef1f5 100%);
          color: #4a4f5a;
          box-shadow:
            inset 1px 1px 2px rgba(255,255,255,.96),
            inset -2px -2px 4px rgba(59,64,76,.34),
            0 1px 2px rgba(0,0,0,.25);
        }
        body:has(.home-page) .winamp-buttons button:nth-child(2) {
          min-width: 31px;
          min-height: 30px;
          margin-top: -2px;
          color: #303640;
        }
        .desktop-room { width: 100vw; height: 100vh; min-height: 100vh; position: relative; overflow: hidden; }
        .home-dancer-shadow {
          position: absolute;
          left: 50%;
          top: calc(50% + min(15vw, 170px));
          z-index: 4;
          width: min(12vw, 140px);
          height: auto;
          object-fit: contain;
          transform: translate(-50%, -50%);
          user-select: none;
          pointer-events: none;
        }
        .home-dancer {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 5;
          width: min(38vw, 430px);
          max-height: 72vh;
          object-fit: contain;
          transform: translate(-50%, -50%);
          background: transparent;
          user-select: none;
          cursor: pointer;
        }
        .home-dancer.is-hidden {
          opacity: 0;
          pointer-events: none;
        }
        .home-dancer.is-visible {
          opacity: 1;
          pointer-events: auto;
        }
        .home-boutique-button {
          position: absolute;
          left: 50%;
          top: calc(50% + min(18vw, 210px));
          z-index: 8;
          width: min(42vw, 480px, calc(100vw - 520px));
          max-width: calc(100vw - 32px);
          padding: 0;
          border: 0;
          background: transparent;
          transform: translateX(-50%);
          filter: drop-shadow(4px 5px 0 rgba(30, 34, 170, .75));
        }
        .home-boutique-button img {
          display: block;
          width: 100%;
          height: auto;
        }
        .home-left-buttons {
          position: absolute;
          left: calc(50% - min(34vw, 390px));
          top: 50%;
          z-index: 8;
          display: grid;
          gap: 18px;
          transform: translate(-50%, -50%) rotate(-2deg);
        }
        .home-right-buttons {
          position: absolute;
          right: calc(50% - min(34vw, 390px));
          top: 50%;
          z-index: 8;
          display: grid;
          gap: 18px;
          transform: translate(50%, -50%) rotate(2deg);
        }
        .home-image-button {
          width: min(24vw, 260px);
          padding: 0;
          border: 0;
          background: transparent;
          filter: drop-shadow(4px 5px 0 rgba(30, 34, 170, .75));
        }
        .home-image-button img {
          display: block;
          width: 100%;
          height: auto;
        }
        @media (max-width: 900px) {
          .desktop-room { width: 100vw; height: 100vh; min-height: 100vh; }
          .home-dancer-shadow {
            top: calc(45% + min(28vw, 132px));
            width: min(24vw, 110px);
          }
          .home-dancer { top: 45%; width: min(72vw, 340px); max-height: 62vh; }
          .home-boutique-button {
            top: calc(45% + min(41vw, 190px));
            bottom: auto;
            width: min(62vw, 238px);
            max-width: calc(100vw - 32px);
          }
          .home-left-buttons {
            left: 0;
            top: 0;
            bottom: 0;
            width: 50%;
            display: block;
            transform: none;
          }
          .home-right-buttons {
            right: 0;
            top: 0;
            bottom: 0;
            width: 50%;
            display: block;
            transform: none;
          }
          .home-image-button {
            position: absolute;
            width: min(34vw, 142px);
          }
          .portfolio-button {
            left: 16px;
            top: 23%;
            transform: translateY(-50%) rotate(-2deg);
          }
          .buzz-button {
            right: 16px;
            top: 23%;
            transform: translateY(-50%) rotate(2deg);
          }
          .about-button {
            left: 16px;
            top: 52%;
            transform: translateY(-50%) rotate(-2deg);
          }
          .invite-button {
            right: 16px;
            top: 52%;
            transform: translateY(-50%) rotate(2deg);
          }
          body:has(.home-page) .winamp {
            width: calc(100vw - 20px);
            right: 10px;
            bottom: 10px;
            display: grid;
            grid-template-columns: auto max-content;
            align-items: center;
          }
          body:has(.home-page) .winamp.is-mini {
            width: calc(100vw - 20px);
            grid-template-columns: 1fr;
          }
          body:has(.home-page) .winamp-top {
            grid-column: 1 / -1;
            min-height: 23px;
            padding-left: 44px;
          }
          body:has(.home-page) .track {
            min-width: 0;
            margin: 0 5px 0 44px;
            padding: 6px 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          body:has(.home-page) .winamp-buttons {
            padding: 0 6px 0 4px;
            justify-content: flex-end;
          }
          body:has(.home-page) .winamp-buttons button {
            min-width: 26px;
            min-height: 24px;
          }
        }
        @media (min-width: 901px) and (max-height: 760px) {
          .home-boutique-button {
            top: calc(50% + min(16vw, 180px));
            width: min(36vw, 390px, calc(100vw - 540px));
          }
        }
        @media (min-width: 1025px) {
          .home-left-buttons,
          .home-right-buttons {
            top: 47%;
          }
        }
        @media (min-width: 901px) and (max-height: 620px) {
          .home-boutique-button {
            top: calc(50% + min(14vw, 145px));
            width: min(30vw, 300px, calc(100vw - 580px));
          }
        }
        @media (max-width: 900px) and (max-height: 700px) {
          .home-boutique-button {
            top: calc(45% + min(36vw, 160px));
            width: min(56vw, 210px);
          }
        }
        @media (max-width: 900px) and (max-height: 600px) {
          .home-boutique-button {
            top: calc(45% + min(32vw, 136px));
            width: min(50vw, 184px);
          }
        }
      `}</style>
    </>
  );
}
