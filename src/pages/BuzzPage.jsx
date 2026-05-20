import HomeButton from "../components/HomeButton";

export default function BuzzPage({ setPage }) {
  return (
    <>
      <section className="page buzz-page">
        <HomeButton setPage={setPage} />
        <h2>Cuti Buzz</h2>
        <div className="buzz-window">
          <div className="viewer-bar"><span>cuti_buzz.html</span><span>♡ ? ×</span></div>
          <marquee>news fausses mais lumineuses · drop vendredi a 13h13 · atelier badges · radio dingo active</marquee>
          <p>Micro blog fictif du collectif, rempli d'annonces, de captures floues et de petites propheties textiles.</p>
        </div>
      </section>
      <style>{`
        .buzz-window { max-width: 900px; margin: 4vh auto; border: 5px ridge #753BBD; background:#BBC7D6; box-shadow: 13px 13px 0 #DA291C; padding-bottom: 28px; }
        .viewer-bar { display:flex; justify-content:space-between; background:#1E22AA; color:white; padding:8px 12px; }
        .buzz-window marquee { background:#EADA24; color:#DA291C; padding:8px; border-block:3px dashed #171031; }
        .buzz-window p { padding: 24px; font-size: 1.3rem; }
      `}</style>
    </>
  );
}
