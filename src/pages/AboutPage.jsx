import React, { useState } from "react";
import { motion } from "framer-motion";
import aboutDesktopBg from "../components/fond/aboutordi.webp";
import aboutMobileBg from "../components/fond/aboutmobile.webp";
import floorBg from "../components/fond/sol.webp";
import tableForeground from "../components/fond/Table Premier Plan.webp";
import leftArrowGif from "../components/anim/LeftArrow.gif";
import rightArrowGif from "../components/anim/RightArrow.GIF";
import loupeIcon from "../components/anim/Loupe Icon.webp";
import felixMember from "../components/membre/Felix1.svg";
import leoMember from "../components/membre/Leo1.svg";
import maloneMember from "../components/membre/Malone1.svg";
import manueMember from "../components/membre/Manue1.svg";
import popsMember from "../components/membre/Pops1.svg";
import zelieMember from "../components/membre/Zelie1.svg";

const desktopMembers = [
  { src: felixMember, alt: "Felix" },
  { src: leoMember, alt: "Leo" },
  { src: maloneMember, alt: "Malone" },
  { src: manueMember, alt: "Manue" },
  { src: popsMember, alt: "Pops" },
  { src: zelieMember, alt: "Zelie" }
];

const mobileMembers = [
  { src: felixMember, alt: "Felix" },
  { src: leoMember, alt: "Leo" },
  { src: maloneMember, alt: "Malone" },
  { src: manueMember, alt: "Manue" },
  { src: popsMember, alt: "Pops" },
  { src: zelieMember, alt: "Zelie" }
];

const memberHover = { y: -8, rotate: 2 };

export default function AboutPage() {
  const [mobileMemberIndex, setMobileMemberIndex] = useState(0);
  const mobileMember = mobileMembers[mobileMemberIndex];
  const showPreviousMobileMember = () => {
    setMobileMemberIndex((index) => (index - 1 + mobileMembers.length) % mobileMembers.length);
  };
  const showNextMobileMember = () => {
    setMobileMemberIndex((index) => (index + 1) % mobileMembers.length);
  };

  return (
    <section
      className="page about-logo-page"
      style={{
        "--about-desktop-bg": `url(${aboutDesktopBg})`,
        "--about-mobile-bg": `url(${aboutMobileBg})`
      }}
    >
      <img className="about-floor" src={floorBg} alt="" aria-hidden="true" />
      <div className="about-members-stage">
        {desktopMembers.map((member) => (
          <motion.img
            key={member.alt}
            className="about-member"
            src={member.src}
            alt={member.alt}
            whileHover={memberHover}
          />
        ))}
      </div>
      <motion.img
        className="about-mobile-member"
        src={mobileMember.src}
        alt={mobileMember.alt}
        whileHover={memberHover}
      />
      <div className="about-member-preload" aria-hidden="true">
        {mobileMembers.map((member) => (
          <img key={member.alt} src={member.src} alt="" />
        ))}
      </div>
      <div className="about-mobile-controls" aria-label="navigation membres">
        <button className="about-mobile-arrow is-left" type="button" onClick={showPreviousMobileMember} aria-label="membre precedent">
          <img src={leftArrowGif} alt="" aria-hidden="true" />
        </button>
        <button className="about-mobile-arrow is-right" type="button" onClick={showNextMobileMember} aria-label="membre suivant">
          <img src={rightArrowGif} alt="" aria-hidden="true" />
        </button>
      </div>
      <img className="about-loupe-wanderer" src={loupeIcon} alt="" aria-hidden="true" />
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

        .about-members-stage {
          position: absolute;
          left: 50%;
          top: 7vh;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          align-items: center;
          justify-items: center;
          gap: clamp(8px, 1.4vw, 24px);
          width: min(92vw, 1280px);
          max-height: 34vh;
          transform: translateX(-50%);
        }

        .about-member {
          display: block;
          width: clamp(92px, 12vw, 178px);
          max-width: 100%;
          max-height: min(29vh, 210px);
          height: auto;
          object-fit: contain;
          user-select: none;
        }

        .about-floor {
          display: block;
          position: absolute;
          left: 50%;
          bottom: clamp(-780px, -60vh, -440px);
          z-index: 1;
          width: 100vw;
          min-width: 100%;
          height: auto;
          object-fit: cover;
          transform: translateX(-50%);
          user-select: none;
          pointer-events: none;
        }

        .about-mobile-member,
        .about-mobile-controls,
        .about-member-preload {
          display: none;
        }

        .about-table-foreground {
          display: block;
          position: absolute;
          right: 24px;
          bottom: 36px;
          z-index: 3;
          width: min(56vw, 540px);
          max-height: 52vh;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        .about-loupe-wanderer {
          display: block;
          position: absolute;
          left: 12vw;
          top: 18vh;
          z-index: 4;
          width: clamp(74px, 8vw, 128px);
          height: auto;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          transform-origin: 50% 70%;
          animation: about-loupe-walk 18s ease-in-out infinite;
        }

        @keyframes about-loupe-walk {
          0% {
            transform: translate(0, 0) rotate(-10deg) scaleX(1);
          }
          18% {
            transform: translate(24vw, 8vh) rotate(9deg) scaleX(1);
          }
          34% {
            transform: translate(46vw, -2vh) rotate(-6deg) scaleX(1);
          }
          50% {
            transform: translate(64vw, 22vh) rotate(12deg) scaleX(1);
          }
          51% {
            transform: translate(64vw, 22vh) rotate(12deg) scaleX(-1);
          }
          68% {
            transform: translate(42vw, 30vh) rotate(-8deg) scaleX(-1);
          }
          84% {
            transform: translate(18vw, 18vh) rotate(8deg) scaleX(-1);
          }
          100% {
            transform: translate(0, 0) rotate(-10deg) scaleX(-1);
          }
        }

        @media (max-width: 900px) {
          .about-logo-page {
            background-image: var(--about-mobile-bg);
          }

          .about-members-stage {
            display: none;
          }

          .about-mobile-member {
            display: block;
            position: absolute;
            left: 50%;
            top: 34%;
            z-index: 2;
            width: min(82vw, 380px);
            max-height: 58vh;
            height: auto;
            object-fit: contain;
            transform: translate(-50%, -50%);
            user-select: none;
          }

          .about-mobile-controls {
            display: block;
            position: absolute;
            left: 50%;
            top: calc(34% + min(29vh, 190px));
            z-index: 3;
            width: min(82vw, 380px);
            height: 44px;
            transform: translateX(-50%);
          }

          .about-mobile-arrow {
            position: absolute;
            top: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 58px;
            padding: 0;
            border: 0;
            background: transparent;
          }

          .about-mobile-arrow img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .about-mobile-arrow.is-left {
            left: 0;
          }

          .about-mobile-arrow.is-right {
            right: 0;
          }

          .about-table-foreground {
            display: none;
          }

          .about-floor {
            display: none;
          }

          .about-loupe-wanderer {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
