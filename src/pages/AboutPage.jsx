import React from "react";
import { motion } from "framer-motion";
import aboutDesktopBg from "../components/fond/aboutordi.webp";
import aboutMobileBg from "../components/fond/aboutmobile.webp";
import tableForeground from "../components/fond/Table Premier Plan.webp";
import felixMember from "../components/membre/Felix1.svg";
import leoMember from "../components/membre/Leo1.svg";
import maloneMember from "../components/membre/Malone1.svg";
import manueMember from "../components/membre/Manue1.svg";
import popsMember from "../components/membre/Pops1.svg";
import zelieMember from "../components/membre/Zelie1.svg";

const desktopMemberColumns = [
  [
    { src: felixMember, alt: "Felix" },
    { src: popsMember, alt: "Pops" }
  ],
  [
    { src: leoMember, alt: "Leo" },
    { src: zelieMember, alt: "Zelie" }
  ],
  [{ src: maloneMember, alt: "Malone" }],
  [{ src: manueMember, alt: "Manue" }]
];

const memberHover = { y: -8, rotate: 2 };

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
        {desktopMemberColumns.map((column, index) => (
          <div className={`about-member-column ${index < 2 ? "is-lower" : ""}`} key={column[0].alt}>
            {column.map((member) => (
              <motion.img
                key={member.alt}
                className="about-member"
                src={member.src}
                alt={member.alt}
                whileHover={memberHover}
              />
            ))}
          </div>
        ))}
      </div>
      <motion.img
        className="about-mobile-member"
        src={felixMember}
        alt="Felix"
        whileHover={memberHover}
      />
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

        .about-member-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: min(2.5vh, 24px);
          width: min(18vw, 220px);
        }

        .about-member-column.is-lower {
          transform: translateY(82px);
        }

        .about-member {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          user-select: none;
        }

        .about-mobile-member {
          display: none;
        }

        .about-table-foreground {
          display: block;
          position: absolute;
          right: 24px;
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

          .about-mobile-member {
            display: block;
            position: absolute;
            left: 50%;
            top: 38%;
            z-index: 2;
            width: min(82vw, 380px);
            max-height: 58vh;
            height: auto;
            object-fit: contain;
            transform: translate(-50%, -50%);
            user-select: none;
          }

          .about-table-foreground {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
