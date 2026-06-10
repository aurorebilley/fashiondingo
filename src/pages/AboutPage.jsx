import React from "react";
import HomeButton from "../components/HomeButton";
import logoWebm from "../components/anim/logo site.webm";
import logoMp4 from "../components/anim/logo site.mp4";
import aboutDesktopBg from "../components/fond/aboutordi.webp";
import aboutMobileBg from "../components/fond/aboutmobile.webp";

export default function AboutPage({ setPage }) {
  return (
    <section
      className="page about-logo-page"
      style={{
        "--about-desktop-bg": `url(${aboutDesktopBg})`,
        "--about-mobile-bg": `url(${aboutMobileBg})`
      }}
    >
      <HomeButton setPage={setPage} />
      <video className="about-logo-video" autoPlay loop muted playsInline>
        <source src={logoWebm} type="video/webm" />
        <source src={logoMp4} type="video/mp4" />
      </video>
      <style>{`
        .about-logo-page {
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          overflow: hidden;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
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

        .about-logo-video {
          display: block;
          width: min(90vw, 720px);
          height: auto;
        }

        @media (max-width: 900px) {
          .about-logo-page {
            background-image: var(--about-mobile-bg);
          }
        }
      `}</style>
    </section>
  );
}
