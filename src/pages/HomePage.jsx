import React, { useMemo } from "react";
import forestBg from "../components/fond/Front-Page-Forest-1920x1080.webp";
import islandBg from "../components/fond/Front-Page-Island-1920x1080.webp";
import partyBg from "../components/fond/Front-Page-Party-1920x1080.webp";
import scoobyBg from "../components/fond/Front-Page-Scooby-1920x1080.webp";
import streetBg from "../components/fond/Front-Page-Street-1920x1080.webp";
import dancerImage from "../components/anim/perso fashion D DANSE rumba0001.png";

const homeBackgrounds = [forestBg, islandBg, partyBg, scoobyBg, streetBg];

export default function HomePage() {
  const background = useMemo(
    () => homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)],
    []
  );

  return (
    <>
      <section className="page home-page" style={{ "--home-bg": `url(${background})` }}>
        <div className="desktop-room">
          <div className="home-title-wrap">
            <h1>Fashion Dingo</h1>
          </div>
          <img className="home-dancer" src={dancerImage} alt="" />
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
        }
        body:has(.home-page) .social-strip a {
          background: transparent;
          border: 0;
          min-width: 30px;
          min-height: 30px;
          color: #EADA24;
          filter: drop-shadow(2px 2px 0 #1E22AA) drop-shadow(-1px -1px 0 #DA291C);
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
          .home-dancer { width: min(72vw, 340px); max-height: 62vh; }
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
      `}</style>
    </>
  );
}
