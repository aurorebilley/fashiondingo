import React from "react";
import aboutDesktopBg from "../components/fond/aboutordi.webp";
import aboutMobileBg from "../components/fond/aboutmobile.webp";
import tableForeground from "../components/fond/Table Premier Plan.webp";

export default function AboutPage() {
  return (
    <section
      className="page about-logo-page"
      style={{
        "--about-desktop-bg": `url(${aboutDesktopBg})`,
        "--about-mobile-bg": `url(${aboutMobileBg})`
      }}
    >
      <img className="about-table-foreground" src={tableForeground} alt="" aria-hidden="true" />
      <style>{`
        .about-logo-page {
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          overflow: hidden;
          padding: 0;
          background-image: var(--about-desktop-bg);
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          background-color: #171031;
        }

        main:has(.about-logo-page) {
          height: 100vh;
          overflow: hidden;
        }

        .about-table-foreground {
          display: block;
          position: absolute;
          right: 48px;
          bottom: 36px;
          width: min(64vw, 620px);
          max-height: 58vh;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .about-logo-page {
            background-image: var(--about-mobile-bg);
          }

          .about-table-foreground {
            position: static;
            margin: auto;
            width: min(78vw, 420px);
            max-height: 52vh;
          }
        }
      `}</style>
    </section>
  );
}
