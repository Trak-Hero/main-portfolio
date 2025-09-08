import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Modal({ project, onClose }) {
  const card = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      card.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    const onEsc = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <section className="modalCard" ref={card} onClick={e => e.stopPropagation()}>
        <header className="modalHead">
          <h2>{project.title}</h2>
          <button onClick={onClose} aria-label="Close">×</button>
        </header>
        <p className="modalDesc">{project.description}</p>
        <div className="modalLinks">
          {project.website && (
            <a className="action" href={project.website} target="_blank" rel="noreferrer">
              Visit Website →
            </a>
          )}
          {project.slide && (
            <a className="action" href={project.slide} target="_blank" rel="noreferrer">
              View Slide Deck →
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
