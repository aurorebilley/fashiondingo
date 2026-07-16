import { useLayoutEffect, useRef, useState } from "react";
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
  {
    src: felixMember,
    alt: "Felix",
    name: "Félix",
    copy: "le deuxième geek de la bande.\ninfo : toujours aux aguets."
  },
  {
    src: leoMember,
    alt: "Leo",
    name: "Léo",
    copy: "le quatrième geek de la bande spécialité magic.\ninfo : pro de la truffade."
  },
  {
    src: maloneMember,
    alt: "Malone",
    name: "Malone",
    copy: "le geek de la bande.\ninfo : n’a en réalité que deux couettes."
  },
  {
    src: manueMember,
    alt: "Manue",
    name: "Manue",
    copy: "A le sens du style.\ninfo : vit recluse avec ses deux chattes."
  },
  {
    src: popsMember,
    alt: "Pops",
    name: "Pops",
    copy: "Dort après les repas.\ninfo : en perpétuelle crise d’ado."
  },
  {
    src: zelieMember,
    alt: "Zelie",
    name: "Zélie",
    copy: "la troisième geek de la bande.\ninfo : force weird (est capable d’enlever une de ses dents)."
  }
];

const desktopTopMembers = desktopMembers.slice(0, 4);
const desktopLowerMembers = desktopMembers.slice(4);

const mobileMembers = desktopMembers;

const memberHover = { y: -8, rotate: 2 };
const defaultDesktopCopy =
  "Fashion Dingo est un collectif d'artistes travaillant autour de l’univers de la mode et de la musique. Le principe est simple : réinventer les défilés pour faire entrer la mode dans un monde absurde, coloré et inventif. Pour ça, la bande de dingos ramène des valises remplies des costumes qu'elle a fabriqué en glanant tissus et étoffes déchues, et fait participer des volontaires sur place pour défiler autour d'un show déjanté, participatif et libérateur !";
const selectedMemberAnimation = {
  y: [0, -10, 0, -5, 0],
  rotate: [0, -2, 2, -1, 0],
  transition: {
    duration: 1.4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function AboutPage() {
  const [selectedDesktopMember, setSelectedDesktopMember] = useState(null);
  const [copyFontSize, setCopyFontSize] = useState(null);
  const textBoxRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const desktopTitle = selectedDesktopMember?.name ?? "Qui sommes nous ?";
  const desktopCopy = selectedDesktopMember?.copy ?? defaultDesktopCopy;

  useLayoutEffect(() => {
    const textBox = textBoxRef.current;
    const title = titleRef.current;
    const copy = copyRef.current;

    if (!textBox || !title || !copy) {
      return undefined;
    }

    let animationFrame = null;

    const fitCopyToSpace = () => {
      if (window.innerWidth <= 900) {
        return;
      }

      const titleStyles = window.getComputedStyle(title);
      const copyStyles = window.getComputedStyle(copy);
      const titleFontSize = parseFloat(titleStyles.fontSize) || 48;
      const copyMarginTop = parseFloat(copyStyles.marginTop) || 0;
      const availableHeight = textBox.clientHeight - title.offsetHeight - copyMarginTop;
      const availableWidth = copy.clientWidth;

      if (availableHeight <= 0 || availableWidth <= 0) {
        return;
      }

      let min = 10;
      let max = Math.max(min, titleFontSize * 0.72);

      for (let index = 0; index < 18; index += 1) {
        const next = (min + max) / 2;
        copy.style.fontSize = `${next}px`;

        if (copy.scrollHeight <= availableHeight + 1 && copy.scrollWidth <= availableWidth + 1) {
          min = next;
        } else {
          max = next;
        }
      }

      setCopyFontSize(Math.floor(min * 10) / 10);
    };

    const scheduleFit = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(fitCopyToSpace);
    };

    scheduleFit();
    window.addEventListener("resize", scheduleFit);
    document.fonts?.ready.then(scheduleFit);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("resize", scheduleFit);
    };
  }, [desktopCopy, desktopTitle]);

  return (
    <section
      className="page about-logo-page"
      onClick={() => setSelectedDesktopMember(null)}
      style={{
        "--about-desktop-bg": `url(${aboutDesktopBg})`,
        "--about-mobile-bg": `url(${aboutMobileBg})`
      }}
    >
      <div className="about-floor-layer">
        <img className="about-floor" src={floorBg} alt="" aria-hidden="true" />
        <div className="about-floor-text" ref={textBoxRef}>
          <div className="about-desktop-title" ref={titleRef}>{desktopTitle}</div>
          <p
            className="about-desktop-copy"
            ref={copyRef}
            style={copyFontSize ? { fontSize: `${copyFontSize}px` } : undefined}
          >
            {desktopCopy}
          </p>
        </div>
      </div>
      <div className="about-members-stage">
        <div className="about-members-line is-top">
          {desktopTopMembers.map((member) => (
            <div className={`about-member-slot about-member-slot-${member.alt.toLowerCase()}`} key={member.alt}>
              <motion.button
                className="about-member-button"
                type="button"
                aria-label={`Afficher ${member.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedDesktopMember(member);
                }}
                animate={selectedDesktopMember?.alt === member.alt ? selectedMemberAnimation : { y: 0, rotate: 0 }}
                whileHover={memberHover}
              >
                <img className="about-member" src={member.src} alt={member.alt} />
              </motion.button>
            </div>
          ))}
        </div>
        <div className="about-members-line is-lower">
          {desktopLowerMembers.map((member) => (
            <div className={`about-member-slot about-member-slot-${member.alt.toLowerCase()}`} key={member.alt}>
              <motion.button
                className="about-member-button"
                type="button"
                aria-label={`Afficher ${member.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedDesktopMember(member);
                }}
                animate={selectedDesktopMember?.alt === member.alt ? selectedMemberAnimation : { y: 0, rotate: 0 }}
                whileHover={memberHover}
              >
                <img className="about-member" src={member.src} alt={member.alt} />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
      <div className="about-mobile-members-scroll">
        {mobileMembers.map((member) => (
          <div className="about-mobile-member-block" key={member.alt}>
            <motion.img
              className="about-mobile-member"
              src={member.src}
              alt={member.alt}
              whileHover={memberHover}
            />
            <article className="soap-card about-mobile-member-card">
              <h2>{member.name}</h2>
              <p>{member.copy}</p>
            </article>
          </div>
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

        .about-member-button {
          display: block;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .about-member-button:focus-visible {
          outline: 3px solid #EADA24;
          outline-offset: 6px;
          border-radius: 10px;
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
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          width: 100vw;
          height: 27.5vh;
          min-width: 100%;
          user-select: none;
          pointer-events: none;
        }

        .about-floor {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-floor-text {
          position: absolute;
          left: clamp(24px, 4vw, 72px);
          right: calc(min(56vw, 540px) + 24px + clamp(24px, 4vw, 64px));
          top: clamp(8px, 2vh, 22px);
          bottom: clamp(8px, 1.6vh, 18px);
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: auto;
          max-width: none;
          pointer-events: none;
          user-select: none;
        }

        .about-desktop-title {
          max-width: 100%;
          color: #EADA24;
          font-family: Griffy, serif;
          font-size: clamp(2rem, min(4.4vw, 6.4vh), 4rem);
          line-height: 0.86;
          letter-spacing: 0;
          text-shadow: 5px 5px #1E22AA, -3px -2px #DA291C;
        }

        .about-desktop-copy {
          width: 100%;
          margin: clamp(5px, 0.9vh, 10px) 0 0;
          color: #fff4b8;
          font-size: clamp(0.86rem, min(1.52vw, 2.24vh), 1.42rem);
          line-height: 1.08;
          text-align: left;
          white-space: pre-line;
          text-wrap: pretty;
          text-shadow: 2px 2px #1E22AA;
        }

        .about-mobile-members-scroll {
          display: none;
        }

        .soap-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          width: min(100%, 520px);
          height: auto;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 34px;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(255, 255, 255, 0.85) 0%,
              rgba(255, 255, 255, 0.25) 12%,
              transparent 30%
            ),
            radial-gradient(
              circle at 80% 10%,
              rgba(127, 236, 255, 0.65) 0%,
              transparent 38%
            ),
            radial-gradient(
              circle at 10% 80%,
              rgba(255, 137, 245, 0.55) 0%,
              transparent 42%
            ),
            radial-gradient(
              circle at 85% 85%,
              rgba(114, 215, 255, 0.55) 0%,
              transparent 40%
            ),
            linear-gradient(
              135deg,
              rgba(223, 163, 255, 0.45),
              rgba(152, 232, 255, 0.45),
              rgba(242, 180, 255, 0.38)
            );
          box-shadow:
            0 18px 45px rgba(126, 211, 255, 0.2),
            0 0 24px rgba(221, 145, 255, 0.28),
            inset 0 0 35px rgba(255, 255, 255, 0.38);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          color: #222;
        }

        .soap-card::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: -35%;
          left: -10%;
          width: 75%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse,
            rgba(255, 255, 255, 0.75) 0%,
            rgba(255, 255, 255, 0.2) 45%,
            transparent 72%
          );
          filter: blur(10px);
          transform: rotate(-12deg);
        }

        .soap-card::after {
          content: "";
          position: absolute;
          z-index: -1;
          inset: -40%;
          background:
            repeating-linear-gradient(
              125deg,
              rgba(255, 120, 255, 0.08) 0px,
              rgba(120, 230, 255, 0.08) 18px,
              rgba(255, 255, 255, 0.05) 35px,
              transparent 50px
            ),
            conic-gradient(
              from 120deg,
              transparent,
              rgba(116, 236, 255, 0.22),
              rgba(240, 133, 255, 0.25),
              rgba(255, 255, 255, 0.12),
              rgba(100, 216, 255, 0.2),
              transparent
            );
          background-size: 180px 180px, cover;
          background-blend-mode: screen;
          filter: blur(30px);
          opacity: 0.9;
          animation: soap-movement 12s linear infinite;
        }

        .soap-card h2 {
          margin: 0 0 16px;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          line-height: 1.1;
        }

        .soap-card p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.6;
          white-space: pre-line;
        }

        @keyframes soap-movement {
          to {
            transform: rotate(360deg);
          }
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
            bottom: 0;
          }

          .about-floor-text {
            right: calc(min(56vw, 540px) + 24px + clamp(32px, 5vw, 80px));
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

          .about-mobile-member-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(14px, 4vw, 24px);
            width: 100%;
            padding: 0 clamp(14px, 5vw, 26px);
          }

          .about-mobile-member {
            display: block;
            width: min(82vw, 380px);
            max-height: none;
            height: auto;
            object-fit: contain;
            user-select: none;
          }

          .about-mobile-member-card {
            width: 100%;
            max-width: 520px;
            padding: clamp(24px, 7vw, 40px);
          }

          .about-table-foreground {
            display: none;
          }

          .about-floor-layer {
            display: none;
          }

          .about-floor-text {
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
