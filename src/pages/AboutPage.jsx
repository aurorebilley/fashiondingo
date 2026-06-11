import { motion } from "framer-motion";
import aboutDesktopBg from "../components/fond/aboutordi.webp";
import aboutMobileBg from "../components/fond/aboutmobile.webp";
import floorBg from "../components/fond/sol.webp";
import tableForeground from "../components/fond/Table Premier Plan.webp";
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

const desktopTopMembers = desktopMembers.slice(0, 4);
const desktopLowerMembers = desktopMembers.slice(4);

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
  return (
    <section
      className="page about-logo-page"
      style={{
        "--about-desktop-bg": `url(${aboutDesktopBg})`,
        "--about-mobile-bg": `url(${aboutMobileBg})`
      }}
    >
      <div className="about-floor-layer">
        <img className="about-floor" src={floorBg} alt="" aria-hidden="true" />
        <div className="about-desktop-title">Qui sommes nous ?</div>
        <p className="about-desktop-copy">
          Hoc inmaturo interitu ipse quoque sui pertaesus excessit e vita aetatis nono anno atque vicensimo cum quadriennio imperasset. natus apud Tuscos in Massa Veternensi, patre Constantio Constantini fratre imperatoris, matreque Galla sorore Rufini et Cerealis, quos trabeae consulares nobilitarunt et praefecturae.
        </p>
      </div>
      <div className="about-members-stage">
        <div className="about-members-line is-top">
          {desktopTopMembers.map((member) => (
            <div className={`about-member-slot about-member-slot-${member.alt.toLowerCase()}`} key={member.alt}>
              <motion.img
                className="about-member"
                src={member.src}
                alt={member.alt}
                whileHover={memberHover}
              />
            </div>
          ))}
        </div>
        <div className="about-members-line is-lower">
          {desktopLowerMembers.map((member) => (
            <div className={`about-member-slot about-member-slot-${member.alt.toLowerCase()}`} key={member.alt}>
              <motion.img
                className="about-member"
                src={member.src}
                alt={member.alt}
                whileHover={memberHover}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="about-mobile-members-scroll">
        {mobileMembers.map((member) => (
          <motion.img
            key={member.alt}
            className="about-mobile-member"
            src={member.src}
            alt={member.alt}
            whileHover={memberHover}
          />
        ))}
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

        .about-logo-page::before {
          content: "";
          display: none;
        }

        .about-members-stage {
          position: absolute;
          left: 50%;
          top: 5vh;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.2vh, 26px);
          width: min(92vw, 1180px);
          transform: translateX(-50%);
        }

        .about-members-line {
          display: grid;
          align-items: center;
          justify-items: center;
          gap: clamp(10px, 1.8vw, 30px);
        }

        .about-members-line.is-top {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          width: min(82vw, 1060px);
          margin: 0 auto;
        }

        .about-members-line.is-lower {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          width: min(42vw, 640px);
          margin-left: clamp(18px, 3vw, 58px);
        }

        .about-member-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .about-member {
          display: block;
          width: clamp(124px, 14vw, 230px);
          max-width: 100%;
          max-height: min(30vh, 250px);
          height: auto;
          object-fit: contain;
          user-select: none;
        }

        .about-member-slot-malone,
        .about-member-slot-manue {
          transform: translateY(clamp(58px, 10vh, 116px));
        }

        .about-floor-layer {
          position: absolute;
          left: 50%;
          bottom: clamp(-700px, -54vh, -390px);
          z-index: 1;
          width: 100vw;
          min-width: 100%;
          aspect-ratio: 16 / 9;
          transform: translateX(-50%);
          user-select: none;
          pointer-events: none;
        }

        .about-floor {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-desktop-title {
          position: absolute;
          left: clamp(24px, 4vw, 72px);
          top: clamp(10px, 3.4vh, 48px);
          z-index: 1;
          max-width: min(48vw, 640px);
          color: #EADA24;
          font-family: Griffy, serif;
          font-size: clamp(2rem, 4.6vw, 4.5rem);
          line-height: 0.9;
          letter-spacing: 0;
          text-shadow: 5px 5px #1E22AA, -3px -2px #DA291C;
          pointer-events: none;
          user-select: none;
        }

        .about-desktop-copy {
          position: absolute;
          left: clamp(28px, 4.2vw, 80px);
          top: clamp(84px, 14vh, 160px);
          z-index: 1;
          width: min(48vw, 820px);
          max-width: calc(100vw - min(56vw, 540px) - 120px);
          margin: 0;
          color: #fff4b8;
          font-size: clamp(0.95rem, 1.45vw, 1.55rem);
          line-height: 1.14;
          text-align: left;
          text-wrap: pretty;
          text-shadow: 2px 2px #1E22AA;
          pointer-events: none;
          user-select: none;
        }

        .about-mobile-members-scroll {
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

        @media (min-width: 901px) and (min-aspect-ratio: 16 / 10) {
          .about-floor-layer {
            bottom: clamp(-760px, -58vh, -500px);
          }

          .about-desktop-copy {
            width: min(40vw, 760px);
            max-width: calc(100vw - min(56vw, 540px) - 150px);
          }
        }

        @media (max-width: 900px) {
          .about-logo-page {
            height: 100vh;
            min-height: 100vh;
            overflow: hidden;
            background-image: none;
          }

          main:has(.about-logo-page) {
            height: 100vh;
            overflow: hidden;
          }

          .about-logo-page::before {
            content: "";
            display: block;
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background-image: var(--about-mobile-bg);
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }

          .about-members-stage {
            display: none;
          }

          .about-mobile-members-scroll {
            position: absolute;
            inset: 0;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(20px, 5vh, 38px);
            width: 100%;
            height: 100vh;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding: 14vh 0 12vh;
          }

          .about-mobile-member {
            display: block;
            width: min(82vw, 380px);
            max-height: none;
            height: auto;
            object-fit: contain;
            user-select: none;
          }

          .about-table-foreground {
            display: none;
          }

          .about-floor-layer {
            display: block;
            bottom: clamp(-220px, -24vh, -120px);
            z-index: 1;
          }

          .about-desktop-title {
            display: none;
          }

          .about-desktop-copy {
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
