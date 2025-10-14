import React, { useMemo, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Tile from "../components/Tile";
import Modal from "../components/Modal";

/** 👉 Put your thumbnails in /public/thumbs/ */
const PROJECTS = [
  {
    id: "harmonize",
    title: "Harmonize",
    tag: "Computer Science",
    website: "https://project-music-and-memories-umzm.onrender.com/",
    slide: "https://github.com/Trak-Hero/Harmonize-frontend",
    description:
      "Harmonize, a full stack social music platform with Spotify and Ticketmaster API integration. I designed and managed both the frontend (React, Tailwind, Mapbox) and backend (Node.js, MongoDB), ensuring seamless collaboration across the team. At the same time, I challenged myself to master Three.js, going beyond the curriculum to build interactive 3D websites.",
    thumb: "/thumbs/harmonize.jpg",
  },
  {
    id: "toad",
    title: "Toad & I",
    tag: "Computer Science",
    website: "https://lab2-quiz-platform-trak-hero.onrender.com",
    slide: null,
    description:
      "Written out of my passion for storytelling and cozy games, I made this website with the Professor's challenge of using only HTML and CSS. It follows a simple slow life journey between a Toad and a Frog (YOU!). This project received the highest recorgnition in the class for its creativity and design.",
    thumb: "/thumbs/toad.jpg",
  },

  /* NEW: Design breakdown tiles */
  {
    id: "inventory-design",
    title: "Design Breakdown — Stock Inventory",
    tag: "Design",
    website: "https://readymag.website/u1389774808/5836999/",
    slide: null,
    description:
      "Deep-dive on the UX architecture, flows, and guardrails behind COM7's Stock Inventory system.",
    thumb: "/thumbs/Stock-design.png",
  },
  {
    id: "dtsa-design",
    title: "Design Breakdown — Dartmouth Thai Student Association",
    tag: "Design",
    website: "https://readymag.website/u1389774808/5843095/",
    slide: null,
    description:
      "Brand and layout study for the Dartmouth Thai Student Association site.",
    thumb: "/thumbs/tsa-design.png",
  },
  {
    id: "landing",
    title: "Design Study — Landing Page",
    tag: "Design",
    website: "https://lab1-landing-page-trak-hero.onrender.com",
    slide: null,
    description:
      "Study in contrast, rhythm, and hierarchy for a minimal conversion page.",
    thumb: "/thumbs/design-study.jpg",
  },

  {
    id: "workmoji",
    title: "Workmoji",
    tag: "Computer Science",
    website: null,
    slide: "https://www.canva.com/design/DAGyaAnnq2w/Sj3wsZNIk30av6WaHgdMLQ/view?utm_content=DAGyaAnnq2w&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1d2111b174",
    description:
      "A gamified task assignment website for corporate teams. It has uses the Central Authentication System I built for COM7 and has role-based access for superadmin, admins, and staff. Tokens and levels are awarded and can be used for late submissions or to be used in the COM7 TOWN game.",
    thumb: "/thumbs/workmoji.jpg",
  },

  /* UPDATED: relink CS “Stock Inventory” to the design breakdown */
  {
    id: "inventory",
    title: "Stock Inventory",
    tag: "Computer Science",
    website: "https://readymag.website/u1389774808/5836999/",
    slide: null,
    description:
      "An inventory management system for the Talent Acquisition team at COM7. Now linked to the full design breakdown detailing UX decisions and flows.",
    thumb: "/thumbs/inventory.jpg",
  },
  /* NEW: Data Science Tiles */
  {
    id: "offshore-research",
    title: "Offshore Research",
    tag: "Data Science",
    website:
      "https://drive.google.com/file/d/1f_kuc50vxivirv4xLIYgp0bKXws8F1fi/view?usp=sharing",
    slide: "https://www.canva.com/design/DAG0g5mV1EY/vd2QANQgKOZsw1p-owv7cA/edit?utm_content=DAG0g5mV1EY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    description:
      "Investigative research into offshore data and structures, compiling and analyzing datasets into actionable insights.",
    thumb: "/thumbs/offshore.jpg",
  },
  {
    id: "doctor-buddy",
    title: "Doctor Buddy",
    tag: "Data Science",
    website: "https://github.com/Trak-Hero/DoctorBuddy",
    slide: "https://www.canva.com/design/DAGVDtfrJ6w/yxwbDbk8QKVIBKktZlAC7A/edit?utm_content=DAGVDtfrJ6w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    description:
      "A data-driven application for analyzing and enhancing medical support systems, built with a focus on predictive healthcare solutions.",
    thumb: "/thumbs/doctor.png",
  },
  {
    id: "pm25-bdi",
    title: "PM2.5 Pollution Data Engineering — BDI",
    tag: "Data Science",
    website: "https://github.com/Trak-Hero/NCEP_DATA",
    slide: "https://www.canva.com/design/DAGNy2iHczs/tfYZGmIUFikthmdkuPgItQ/edit?utm_content=DAGNy2iHczs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    description:
      "Research at the Big Data Institute developing pipelines to process NCEP GFS weather data for improved PM2.5 pollution prediction and health impact analysis.",
    thumb: "/thumbs/bdi.png",
  },
];

const FILTERS = ["All", "Computer Science", "Design", "Data Science"];

/* ===================== */
/* 🎧 Music Radio Corner  */
/* ===================== */
const TRACKS = [
  // Put the audio files in /public/audio/ and update the src paths:
  { id: "trak1", title: "Childhood Tale", src: "/audio/childhood.mp3" },
  { id: "trak2", title: "planet b612", src: "/audio/b612.mp3" },
];

function MusicRadio() {
  const [open, setOpen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentId, setCurrentId] = useState(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = useMemo(
    () => TRACKS.find(t => t.id === currentId) ?? TRACKS[0],
    [currentId]
  );

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  // When track changes, load and (if already playing) resume play
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack?.src]); // eslint-disable-line

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Autoplay will fail without user interaction; user can press again
        setIsPlaying(false);
      }
    }
  };

  return (
  <div
    style={{
      position: "fixed",
      right: 16,
      bottom: 16,
      zIndex: 9999,
      fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial",
    }}
  >
    {/* Persistent audio element (never unmounted) */}
    <audio ref={audioRef} style={{ display: "none" }}>
      <source src={currentTrack?.src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    {/* Minimized pill */}
    {!open && (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Music Radio"
        style={{
          padding: "10px 14px",
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,.15)",
          background: "#111",
          color: "#fff",
          boxShadow: "0 8px 20px rgba(0,0,0,.25)",
          cursor: "pointer",
        }}
      >
        Music
      </button>
    )}

    {/* Expanded panel */}
    {open && (
      <div
        style={{
          width: 280,
          padding: 12,
          borderRadius: 14,
          background: "rgba(17,17,17,.9)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 12px 28px rgba(0,0,0,.35)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden>🎧</span>
            <strong>Radio</strong>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setMuted(m => !m)}
              title={muted ? "Unmute" : "Mute"}
              style={iconBtn}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
            <button
              onClick={() => setOpen(false)}
              style={iconBtn}
              aria-label="Minimize"
              title="Minimize"
            >
              ⤢
            </button>
          </div>
        </div>

        {/* Track picker */}
        <label
          htmlFor="trackSelect"
          style={{ display: "block", fontSize: 12, opacity: 0.8, marginBottom: 4 }}
        >
          Select song
        </label>
        <select
          id="trackSelect"
          value={currentId}
          onChange={e => setCurrentId(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 10,
            background: "#1c1c1c",
            color: "#fff",
            border: "1px solid rgba(255,255,255,.12)",
            marginBottom: 10,
            cursor: "pointer",
          }}
        >
          {TRACKS.map(t => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={togglePlay}
            style={{
              flex: "0 0 auto",
              padding: "8px 12px",
              borderRadius: 10,
              background: isPlaying ? "#2b6" : "#2a2a2a",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.12)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            {currentTrack?.title}
          </div>
        </div>

        {/* Tiny hint */}
        <div style={{ marginTop: 8, fontSize: 11, opacity: 0.6 }}>
          Tip: some browsers need a click before audio can start.
        </div>
      </div>
    )}
  </div>
);
}

const iconBtn = {
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,.12)",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};

/* ===================== */

export default function HomePage() {
  // read recruiter filter from ?role=cs|design|ds
  const initialFromURL = useMemo(() => {
    const role = new URLSearchParams(window.location.search).get("role");
    if (role === "cs") return "Computer Science";
    if (role === "design") return "Design";
    if (role === "ds") return "Data Science";
    return "All";
  }, []);

  const [filter, setFilter] = useState(initialFromURL);
  const [active, setActive] = useState(null);

  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === filter)),
    [filter]
  );

  useEffect(() => {
    // stagger in tiles
    gsap.fromTo(
      ".tile",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.06 }
    );
  }, [items]);

  return (
    <div className="wrap">
      {/* Top bar with centered HOME */}
      <header className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left side: Back to Space */}
        <div className="leftControls">
          <a
            href="https://trakhero-portfolio.onrender.com/"
            className="backToSpace"
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.2)",
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.9rem",
              lineHeight: 1,
              whiteSpace: "nowrap"
            }}
          >
            ← Back to Space
          </a>
        </div>

        {/* Center: Name + Home */}
        <div className="centerBlock">
          <div className="name">Purin (Trak) Prateepmanowong</div>
          <a className="homeBtn" href="/" aria-label="Home">HOME</a>
        </div>

        {/* Right: Filters */}
        <nav className="filters">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? "isActive" : ""}
            >
              {f}
            </button>
          ))}
        </nav>
      </header>

      {/* Subtle line and label like Farmgroup */}
      <div className="contextRow">
        <span>Showing</span>
        <div className="rule" />
        <span>{filter === "All" ? "All Work" : filter}</span>
      </div>

      <main className="grid">
        {items.map(p => (
          <Tile key={p.id} project={p} onClick={() => setActive(p)} />
        ))}
      </main>

      {active && <Modal project={active} onClose={() => setActive(null)} />}

      {/* 🎵 Music Radio Corner */}
      <MusicRadio />
    </div>
  );
}
