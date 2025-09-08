import React, { useMemo, useState, useEffect } from "react";
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
    website: "https://project-music-and-memories-umzm.onrender.com/",
    slide: null,
    description:
      "Written out of my passion for storytelling and cozy games, I made this website with the Professor's challenge of using only HTML and CSS. It follows a simple slow life journey between a Toad and a Frog (YOU!). This project received the highest recorgnition in the class for its creativity and design.",
    thumb: "/thumbs/toad.jpg",
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
  {
    id: "inventory",
    title: "Stock Inventory",
    tag: "Computer Science",
    website: null,
    slide: "https://www.canva.com/design/DAGyY282Wx0/i8ns5MBkUfq1zTZ3j1W7Eg/view?utm_content=DAGyY282Wx0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3849031a2c",
    description:
      "An inventory management system for Talent Acquisition team at COM7. As the team needs to track a large number of inventories, I built this system with employee query feature, as well as different option loading based on the type of events.",
    thumb: "/thumbs/inventory.jpg",
  },
];

const FILTERS = ["All", "Computer Science", "Design", "Data Science"];

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
      <header className="topbar">
        <div className="spacer" />
        <div className="centerBlock">
            <div className="name">Purin (Trak) Prateepmanowong</div>
            <a className="homeBtn" href="/" aria-label="Home">HOME</a>
        </div>
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
    </div>
  );
}
