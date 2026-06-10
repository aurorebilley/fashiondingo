import React from "react";
import aboutDesktopBg from "../components/fond/aboutordi.webp";
import aboutMobileBg from "../components/fond/aboutmobile.webp";
import tableForeground from "../components/fond/Table Premier Plan.webp";
import felixMember from "../components/membre/Felix1.svg";
import leoMember from "../components/membre/Leo1.svg";
import maloneMember from "../components/membre/Malone1.svg";
import manueMember from "../components/membre/Manue1.svg";

const desktopMembers = [
  { src: felixMember, alt: "Felix" },
  { src: leoMember, alt: "Leo" },
  { src: maloneMember, alt: "Malone" },
  { src: manueMember, alt: "Manue" }
];

export default function AboutPage() {
  return (
    <section
      className="page about-logo-page"
      style={{
        "--about-desktop-bg": `url(${aboutDesktopBg})`,
        "--about-mobile-bg": `url(${aboutMobileBg})`
      }}
    >
      <div className="about-members-row">
        {desktopMembers.map((member) => (
          <img key={member.alt} className="about-member" src={member.src} alt={member.alt} />
        ))}
      </div>
      <img className="about-table-foreground" src={tableForeground} alt="" aria-hidden="true" />
      <style>{`
        .about-logo-page {
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          overflow: hidden;
          padding: 0;
          position: relative;
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

        .about-members-row {
          position: absolute;
          left: 0;
          right: 0;
          top: 33%;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          gap: 0;
          width: 100vw;
          transform: translateY(-50%);
        }

        .about-member {
          display: block;
          width: min(18vw, 220px);
          height: auto;
          object-fit: contain;
          user-select: none;
        }

        .about-table-foreground {
          display: block;
          position: absolute;
          right: 48px;
          bottom: 36px;
          width: min(56vw, 540px);
          max-height: 52vh;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .about-logo-page {
            background-image: var(--about-mobile-bg);
          }

          .about-members-row {
            display: none;
          }

          .about-table-foreground {
            position: static;
            margin: auto;
            width: min(70vw, 360px);
            max-height: 46vh;
          }
        }
      `}</style>
    </section>
  );
}
