import React, { useMemo } from "react";
import Doodle from "../components/Doodle";
import CartoonDingo from "../components/CartoonDingo";
import forestBg from "../components/fond/Front-Page-Forest-1920x1080.webp";
import islandBg from "../components/fond/Front-Page-Island-1920x1080.webp";
import partyBg from "../components/fond/Front-Page-Party-1920x1080.webp";
import scoobyBg from "../components/fond/Front-Page-Scooby-1920x1080.webp";
import streetBg from "../components/fond/Front-Page-Street-1920x1080.webp";

const homeBackgrounds = [forestBg, islandBg, partyBg, scoobyBg, streetBg];

export default function HomePage({ setPage, playing }) {
  const background = useMemo(
    () => homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)],
    []
  );

  return (
    <>
      <section className="page home-page" style={{ "--home-bg": `url(${background})` }}>
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
        .desktop-room { height: 100vh; min-height: 100vh; position: relative; overflow: hidden; }
        .hero-copy { position: relative; z-index: 2; max-width: 780px; padding: 9vh 5vw; transform: rotate(-1deg); }
        .hero-copy p { max-width: 620px; font-size: clamp(1.1rem, 2vw, 1.45rem); background: rgba(255,255,255,.54); border: 2px dashed #DA291C; padding: 10px; }
        .tiny-label { width: max-content; color: #1E22AA; }
        .sun { position: absolute; right: 8%; top: 18%; font-size: 46px; animation: floaty 4s infinite; }
        .spiral { position: absolute; left: 8%; bottom: 14%; font-size: 32px; }
        .badge { position: absolute; right: 18%; bottom: 12%; }
        .home-portal { position: absolute; border: 3px solid #171031; background: #FF9425; padding: 13px 18px; box-shadow: 5px 5px 0 #EADA24; font-weight: 700; }
        .home-portal:hover { box-shadow: 0 0 0 4px #EADA24, 0 0 25px #1E22AA, 8px 8px 0 #DA291C; animation: wobble .75s; }
        .p1 { right: 7%; top: 35%; } .p2 { left: 16%; bottom: 12%; } .p3 { right: 30%; bottom: 5%; }

        @media (max-width: 900px) {
          .desktop-room { height: 100vh; min-height: 100vh; }
          .hero-copy { padding: 60px 18px; }
          .home-portal { position: relative; display:block; width:max-content; margin: 10px 18px; left:auto; right:auto; top:auto; bottom:auto; }
        }
      `}</style>
    </>
  );
}
