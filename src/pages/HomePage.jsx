import React, { useEffect, useMemo, useRef } from "react";
import forestBg from "../components/fond/Front-Page-Forest-1920x1080.webp";
import islandBg from "../components/fond/Front-Page-Island-1920x1080.webp";
import partyBg from "../components/fond/Front-Page-Party-1920x1080.webp";
import scoobyBg from "../components/fond/Front-Page-Scooby-1920x1080.webp";
import streetBg from "../components/fond/Front-Page-Street-1920x1080.webp";
import dancerVideo from "../components/anim/perso coucou.webm";
import dancerSafariVideo from "../components/anim/perso-coucou.mp4";
import dancingVideo from "../components/anim/perso danse.webm";
import dancingSafariVideo from "../components/anim/perso danse.mp4";
import logoVideo from "../components/anim/logo site.webm";
import logoSafariVideo from "../components/anim/logo site.mp4";
import dancerShadow from "../components/anim/Shadow.webp";
import boutiqueButton from "../components/bouton/Boutique.svg";
import portfolioButton from "../components/bouton/Portfolio.svg";
import aboutButton from "../components/bouton/QuiSommesNous.svg";
import cutiBuzzButton from "../components/bouton/CutiBuzz.svg";
import inviteButton from "../components/bouton/NousInviter.svg";

const homeBackgrounds = [forestBg, islandBg, partyBg, scoobyBg, streetBg];

export default function HomePage({ setPage, playing }) {
  const coucouVideoRef = useRef(null);
  const dancingVideoRef = useRef(null);
  const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const coucouSrc = isSafari ? dancerSafariVideo : dancerVideo;
  const dancingSrc = isSafari ? dancingSafariVideo : dancingVideo;
  const logoSrc = isSafari ? logoSafariVideo : logoVideo;
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
          <div className="home-title-wrap">
            <video
              className="home-logo-video"
              src={logoSrc}
              aria-label="Fashion Dingo"
              autoPlay
              loop
              muted
              defaultMuted
              playsInline
              preload="auto"
              controls={false}
              onEnded={loopDancerVideo}
            />
          </div>
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
              <img src={portfolioButton} alt="" />
            </button>
            <button className="home-image-button about-button" type="button" aria-label="qui sommes-nous" onClick={() => setPage("about")}>
              <img src={aboutButton} alt="" />
            </button>
          </div>
          <div className="home-right-buttons" aria-label="navigation secondaire">
            <button className="home-image-button buzz-button" type="button" aria-label="cuti buzz" onClick={() => setPage("buzz")}>
              <img src={cutiBuzzButton} alt="" />
            </button>
            <button className="home-image-button invite-button" type="button" aria-label="nous inviter" onClick={() => setPage("invite")}>
              <img src={inviteButton} alt="" />
            </button>
          </div>
          <button
            className="home-boutique-button"
            type="button"
            aria-label="ouvrir la boutique"
            onClick={() => setPage("shop")}
          >
            <img src={boutiqueButton} alt="" />
          </button>
        </div>
      </section>
      <style>{`
        .home-page {
          height: 100vh;
          min-height: 100vh;
          overflow: hidden;
          padding: 0;
          background-image: var(--home-bg);
          background-position: top center;
          background-size: auto 100%;
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
          border-width: 3px;
          box-shadow: 4px 4px 0 #753BBD;
        }
        body:has(.home-page) .winamp.is-mini {
          width: 156px;
        }
        body:has(.home-page) .winamp-top {
          padding: 4px 6px;
          font-size: 12px;
        }
        body:has(.home-page) .winamp-top button {
          min-width: 22px;
          min-height: 20px;
        }
        body:has(.home-page) .eq {
          display: none;
        }
        body:has(.home-page) .track {
          padding: 7px 8px 4px;
          font-size: 12px;
          line-height: 1.1;
        }
        body:has(.home-page) .winamp-buttons {
          gap: 5px;
          padding: 6px;
        }
        body:has(.home-page) .winamp-buttons button {
          min-width: 27px;
          min-height: 25px;
        }
        .desktop-room { height: 100vh; min-height: 100vh; position: relative; overflow: hidden; }
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
        .home-boutique-button:hover {
          animation: wobble .75s;
          filter: drop-shadow(0 0 12px #1E22AA) drop-shadow(4px 5px 0 rgba(218, 41, 28, .78));
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
        .home-image-button:hover {
          animation: wobble .75s;
          filter: drop-shadow(0 0 12px #1E22AA) drop-shadow(4px 5px 0 rgba(218, 41, 28, .78));
        }
        .home-title-wrap {
          position: fixed;
          top: 16px;
          right: 12px;
          z-index: 31;
          width: min(38vw, 360px);
          height: 76px;
          pointer-events: none;
        }
        .home-logo-video {
          display: block;
          width: 100%;
          max-height: 100%;
          height: auto;
          object-fit: contain;
          background: transparent;
        }
        @media (max-width: 900px) {
          .desktop-room { height: 100vh; min-height: 100vh; }
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
          .home-title-wrap { right: 10px; top: 8px; width: min(42vw, 180px); height: 50px; }
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
          }
          body:has(.home-page) .track {
            min-width: 0;
            padding: 6px 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          body:has(.home-page) .winamp-buttons {
            padding: 5px 6px;
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
