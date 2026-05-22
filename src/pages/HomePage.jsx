import React, { useEffect, useMemo, useRef } from "react";
import forestBg from "../components/fond/Front-Page-Forest-1920x1080.webp";
import islandBg from "../components/fond/Front-Page-Island-1920x1080.webp";
import partyBg from "../components/fond/Front-Page-Party-1920x1080.webp";
import scoobyBg from "../components/fond/Front-Page-Scooby-1920x1080.webp";
import streetBg from "../components/fond/Front-Page-Street-1920x1080.webp";
import dancerVideo from "../components/anim/perso coucou.webm";
import boutiqueButton from "../components/bouton/Boutique.svg";
import portfolioButton from "../components/bouton/Portfolio.svg";
import aboutButton from "../components/bouton/QuiSommesNous.svg";
import cutiBuzzButton from "../components/bouton/CutiBuzz.svg";
import inviteButton from "../components/bouton/NousInviter.svg";

const homeBackgrounds = [forestBg, islandBg, partyBg, scoobyBg, streetBg];

function SafariDancerVideo({ onEnded }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!video || !canvas || !context) return undefined;

    let frameId;
    let drawingStarted = false;
    let isMounted = true;
    const isBackgroundPixel = (pixels, pixelIndex) => (
      pixels[pixelIndex] > 238 &&
      pixels[pixelIndex + 1] > 238 &&
      pixels[pixelIndex + 2] > 238
    );
    const isProtectedCharacterWhiteArea = (x, y, width, height) => {
      const relativeX = x / width;
      const relativeY = y / height;

      return (
        (relativeX > 0.37 && relativeX < 0.63 && relativeY > 0.42 && relativeY < 0.66) ||
        (relativeX > 0.38 && relativeX < 0.62 && relativeY > 0.72 && relativeY < 0.9) ||
        (relativeX > 0.33 && relativeX < 0.67 && relativeY > 0.65 && relativeY < 0.72)
      );
    };

    const drawFrame = () => {
      if (!isMounted) return;

      if (video.videoWidth && video.videoHeight) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frame = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = frame.data;
        const width = canvas.width;
        const height = canvas.height;
        const visited = new Uint8Array(width * height);
        const queue = [];
        const enqueueBackgroundPixel = (x, y) => {
          if (x < 0 || y < 0 || x >= width || y >= height) return;
          if (isProtectedCharacterWhiteArea(x, y, width, height)) return;

          const pixel = y * width + x;
          if (visited[pixel]) return;
          visited[pixel] = 1;

          const pixelIndex = pixel * 4;
          if (isBackgroundPixel(pixels, pixelIndex)) {
            pixels[pixelIndex + 3] = 0;
            queue.push(pixel);
          }
        };

        for (let x = 0; x < width; x += 1) {
          enqueueBackgroundPixel(x, 0);
          enqueueBackgroundPixel(x, height - 1);
        }
        for (let y = 1; y < height - 1; y += 1) {
          enqueueBackgroundPixel(0, y);
          enqueueBackgroundPixel(width - 1, y);
        }

        for (let index = 0; index < queue.length; index += 1) {
          const pixel = queue[index];
          const x = pixel % width;
          const y = Math.floor(pixel / width);
          enqueueBackgroundPixel(x + 1, y);
          enqueueBackgroundPixel(x - 1, y);
          enqueueBackgroundPixel(x, y + 1);
          enqueueBackgroundPixel(x, y - 1);
        }

        context.putImageData(frame, 0, 0);
      }

      if (video.requestVideoFrameCallback) {
        video.requestVideoFrameCallback(drawFrame);
      } else {
        frameId = requestAnimationFrame(drawFrame);
      }
    };

    const startDrawing = () => {
      if (drawingStarted) return;
      drawingStarted = true;
      video.play().catch(() => {});
      drawFrame();
    };

    video.addEventListener("loadeddata", startDrawing);
    startDrawing();

    return () => {
      isMounted = false;
      cancelAnimationFrame(frameId);
      video.removeEventListener("loadeddata", startDrawing);
    };
  }, []);

  return (
    <>
      <video className="home-dancer-source" ref={videoRef} src={dancerVideo} autoPlay loop muted playsInline onEnded={onEnded} />
      <canvas className="home-dancer" ref={canvasRef} aria-hidden="true" />
    </>
  );
}

export default function HomePage({ setPage }) {
  const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const background = useMemo(
    () => homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)],
    []
  );
  const loopDancerVideo = (event) => {
    event.currentTarget.currentTime = 0;
    event.currentTarget.play();
  };

  return (
    <>
      <section className="page home-page" style={{ "--home-bg": `url(${background})` }}>
        <div className="desktop-room">
          <div className="home-title-wrap">
            <h1>Fashion Dingo</h1>
          </div>
          {isSafari ? (
            <SafariDancerVideo onEnded={loopDancerVideo} />
          ) : (
            <video className="home-dancer" src={dancerVideo} autoPlay loop muted playsInline onEnded={loopDancerVideo} />
          )}
          <div className="home-left-buttons" aria-label="navigation secondaire">
            <button className="home-image-button portfolio-button" type="button" aria-label="portfolio" onClick={() => setPage("portfolio")}>
              <img src={portfolioButton} alt="" />
            </button>
            <button className="home-image-button about-button" type="button" aria-label="qui sommes-nous" onClick={() => setPage("about")}>
              <img src={aboutButton} alt="" />
            </button>
          </div>
          <div className="home-right-buttons" aria-label="navigation secondaire">
            <button className="home-image-button buzz-button" type="button" aria-label="cuti buzz" onClick={() => setPage("buzz")}>
              <img src={cutiBuzzButton} alt="" />
            </button>
            <button className="home-image-button invite-button" type="button" aria-label="nous inviter" onClick={() => setPage("invite")}>
              <img src={inviteButton} alt="" />
            </button>
          </div>
          <button
            className="home-boutique-button"
            type="button"
            aria-label="ouvrir la boutique"
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
          background: transparent;
          user-select: none;
          pointer-events: none;
        }
        .home-dancer-source {
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }
        .home-boutique-button {
          position: absolute;
          left: 50%;
          top: calc(50% + min(22vw, 250px));
          z-index: 8;
          width: min(42vw, 480px, calc(100vw - 520px));
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
            top: calc(45% + min(39vw, 178px));
            bottom: auto;
            width: min(48vw, 182px);
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
            top: calc(50% + min(19vw, 205px));
            width: min(36vw, 390px, calc(100vw - 540px));
          }
        }
        @media (min-width: 901px) and (max-height: 620px) {
          .home-boutique-button {
            top: calc(50% + min(17vw, 165px));
            width: min(30vw, 300px, calc(100vw - 580px));
          }
        }
        @media (max-width: 900px) and (max-height: 700px) {
          .home-boutique-button {
            top: calc(45% + min(34vw, 150px));
            width: min(42vw, 158px);
          }
        }
        @media (max-width: 900px) and (max-height: 600px) {
          .home-boutique-button {
            top: calc(45% + min(30vw, 126px));
            width: min(36vw, 132px);
          }
        }
      `}</style>
    </>
  );
}
