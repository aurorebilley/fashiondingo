import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import forestBg from "../components/fond/Front-Page-Forest-1920x1080.webp";
import islandBg from "../components/fond/Front-Page-Island-1920x1080.webp";
import partyBg from "../components/fond/Front-Page-Party-1920x1080.webp";
import scoobyBg from "../components/fond/Front-Page-Scooby-1920x1080.webp";
import streetBg from "../components/fond/Front-Page-Street-1920x1080.webp";
import dancerImage from "../components/anim/perso fashion D DANSE rumba0001.png";
import boutiqueButton from "../components/bouton/Boutique.svg";
import portfolioButton from "../components/bouton/Portfolio.svg";
import aboutButton from "../components/bouton/QuiSommesNous.svg";
import cutiBuzzButton from "../components/bouton/CutiBuzz.svg";
import inviteButton from "../components/bouton/NousInviter.svg";

const homeBackgrounds = [forestBg, islandBg, partyBg, scoobyBg, streetBg];
const boutiqueAspectRatio = 1371 / 482;
const boutiqueEdgeGap = 14;
const boutiqueObstacleGap = 14;

export default function HomePage({ setPage }) {
  const roomRef = useRef(null);
  const dancerRef = useRef(null);
  const aboutRef = useRef(null);
  const inviteRef = useRef(null);
  const [boutiqueLayout, setBoutiqueLayout] = useState(null);
  const background = useMemo(
    () => homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)],
    []
  );

  useLayoutEffect(() => {
    let frameId;

    const collides = (a, b) => (
      a.left < b.right + boutiqueObstacleGap &&
      a.right > b.left - boutiqueObstacleGap &&
      a.top < b.bottom + boutiqueObstacleGap &&
      a.bottom > b.top - boutiqueObstacleGap
    );

    const calculateBoutiqueLayout = () => {
      const room = roomRef.current;
      const dancer = dancerRef.current;
      if (!room || !dancer) return;

      const roomRect = room.getBoundingClientRect();
      const vw = roomRect.width;
      const vh = roomRect.height;
      const isMobile = vw <= 900;
      const dancerGap = isMobile ? 10 : 22;
      const desiredWidth = isMobile ? Math.min(vw * 0.56, 212) : Math.min(vw * 0.42, 480);
      const minWidth = isMobile ? 112 : 130;
      const dancerRect = dancer.getBoundingClientRect();
      const minTop = dancerRect.bottom - roomRect.top + dancerGap;
      const desiredTop = isMobile
        ? minTop + 4
        : Math.max(minTop, vh * 0.5 + Math.min(vw * 0.22, 250));
      const maxScreenWidth = vw - boutiqueEdgeGap * 2;
      const obstacleElements = [
        aboutRef.current,
        inviteRef.current,
        document.querySelector(".winamp")
      ].filter(Boolean);

      for (let width = Math.min(desiredWidth, maxScreenWidth); width >= minWidth; width -= 4) {
        const height = width / boutiqueAspectRatio;
        const left = (vw - width) / 2;
        const right = left + width;
        const allowedMinTop = Math.max(boutiqueEdgeGap, minTop);
        const allowedMaxTop = vh - boutiqueEdgeGap - height;
        if (allowedMinTop > allowedMaxTop) continue;

        const obstacleRects = obstacleElements
          .map((element) => element.getBoundingClientRect())
          .map((rect) => ({
            left: rect.left - roomRect.left,
            right: rect.right - roomRect.left,
            top: rect.top - roomRect.top,
            bottom: rect.bottom - roomRect.top
          }))
          .filter((rect) => left < rect.right + boutiqueObstacleGap && right > rect.left - boutiqueObstacleGap);

        const targetTop = Math.min(Math.max(desiredTop, allowedMinTop), allowedMaxTop);
        const candidates = [targetTop, allowedMinTop, allowedMaxTop];
        obstacleRects.forEach((rect) => {
          candidates.push(rect.top - height - boutiqueObstacleGap);
          candidates.push(rect.bottom + boutiqueObstacleGap);
        });

        const bestTop = candidates
          .map((top) => Math.min(Math.max(top, allowedMinTop), allowedMaxTop))
          .filter((top, index, list) => list.indexOf(top) === index)
          .filter((top) => {
            const boutiqueRect = { left, right, top, bottom: top + height };
            return obstacleRects.every((rect) => !collides(boutiqueRect, rect));
          })
          .sort((a, b) => Math.abs(a - targetTop) - Math.abs(b - targetTop) || b - a)[0];

        if (bestTop !== undefined) {
          setBoutiqueLayout((current) => {
            const next = { top: Math.round(bestTop), width: Math.round(width) };
            return current && current.top === next.top && current.width === next.width ? current : next;
          });
          return;
        }
      }

      const fallbackWidth = Math.min(84, maxScreenWidth);
      const fallbackHeight = fallbackWidth / boutiqueAspectRatio;
      setBoutiqueLayout({
        top: Math.min(Math.max(minTop, boutiqueEdgeGap), vh - boutiqueEdgeGap - fallbackHeight),
        width: fallbackWidth
      });
    };

    const scheduleLayout = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(calculateBoutiqueLayout);
    };

    scheduleLayout();
    window.addEventListener("resize", scheduleLayout);
    window.addEventListener("load", scheduleLayout);
    window.addEventListener("pointerup", scheduleLayout, true);

    const observer = new ResizeObserver(scheduleLayout);
    [roomRef.current, dancerRef.current, aboutRef.current, inviteRef.current, document.querySelector(".winamp")]
      .filter(Boolean)
      .forEach((element) => observer.observe(element));

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleLayout);
      window.removeEventListener("load", scheduleLayout);
      window.removeEventListener("pointerup", scheduleLayout, true);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="page home-page" style={{ "--home-bg": `url(${background})` }}>
        <div className="desktop-room" ref={roomRef}>
          <div className="home-title-wrap">
            <h1>Fashion Dingo</h1>
          </div>
          <img className="home-dancer" src={dancerImage} alt="" ref={dancerRef} onLoad={() => window.dispatchEvent(new Event("resize"))} />
          <div className="home-left-buttons" aria-label="navigation secondaire">
            <button className="home-image-button portfolio-button" type="button" aria-label="portfolio" onClick={() => setPage("portfolio")}>
              <img src={portfolioButton} alt="" />
            </button>
            <button className="home-image-button about-button" type="button" aria-label="qui sommes-nous" ref={aboutRef} onClick={() => setPage("about")}>
              <img src={aboutButton} alt="" />
            </button>
          </div>
          <div className="home-right-buttons" aria-label="navigation secondaire">
            <button className="home-image-button buzz-button" type="button" aria-label="cuti buzz" onClick={() => setPage("buzz")}>
              <img src={cutiBuzzButton} alt="" />
            </button>
            <button className="home-image-button invite-button" type="button" aria-label="nous inviter" ref={inviteRef} onClick={() => setPage("invite")}>
              <img src={inviteButton} alt="" />
            </button>
          </div>
          <button
            className="home-boutique-button"
            type="button"
            aria-label="ouvrir la boutique"
            style={boutiqueLayout ? {
              "--boutique-top": `${boutiqueLayout.top}px`,
              "--boutique-width": `${boutiqueLayout.width}px`
            } : undefined}
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
        .home-dancer {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 5;
          width: min(38vw, 430px);
          max-height: 72vh;
          object-fit: contain;
          transform: translate(-50%, -50%);
          user-select: none;
          pointer-events: none;
        }
        .home-boutique-button {
          position: absolute;
          left: 50%;
          top: var(--boutique-top, calc(50% + min(22vw, 250px)));
          z-index: 8;
          width: var(--boutique-width, min(42vw, 480px, calc(100vw - 520px)));
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
          top: 22px;
          left: 118px;
          right: 18px;
          z-index: 31;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          pointer-events: none;
        }
        .home-title-wrap h1 {
          margin: 0;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-align: right;
          font-size: clamp(22px, 7vw, 76px);
          line-height: 1;
          padding-bottom: .08em;
        }
        @media (max-width: 900px) {
          .desktop-room { height: 100vh; min-height: 100vh; }
          .home-dancer { top: 45%; width: min(72vw, 340px); max-height: 62vh; }
          .home-boutique-button {
            top: var(--boutique-top, calc(45% + min(39vw, 178px)));
            bottom: auto;
            width: var(--boutique-width, min(48vw, 182px));
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
          .home-title-wrap { left: 104px; right: 10px; top: 7px; height: 50px; }
          .home-title-wrap h1 { font-size: clamp(20px, 6vw, 42px); text-shadow: none; }
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
            top: var(--boutique-top, calc(50% + min(19vw, 205px)));
            width: var(--boutique-width, min(36vw, 390px, calc(100vw - 540px)));
          }
        }
        @media (min-width: 901px) and (max-height: 620px) {
          .home-boutique-button {
            top: var(--boutique-top, calc(50% + min(17vw, 165px)));
            width: var(--boutique-width, min(30vw, 300px, calc(100vw - 580px)));
          }
        }
        @media (max-width: 900px) and (max-height: 700px) {
          .home-boutique-button {
            top: var(--boutique-top, calc(45% + min(34vw, 150px)));
            width: var(--boutique-width, min(42vw, 158px));
          }
        }
        @media (max-width: 900px) and (max-height: 600px) {
          .home-boutique-button {
            top: var(--boutique-top, calc(45% + min(30vw, 126px)));
            width: var(--boutique-width, min(36vw, 132px));
          }
        }
      `}</style>
    </>
  );
}
