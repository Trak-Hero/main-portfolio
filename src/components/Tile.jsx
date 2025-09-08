import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Tile({ project, onClick }) {
  const box = useRef(null);
  const img = useRef(null);

  useEffect(() => {
    const el = box.current;
    const enter = () => gsap.to(img.current, { scale: 1.03, duration: 0.3, ease: "power2.out" });
    const leave = () => gsap.to(img.current, { scale: 1.0, duration: 0.3, ease: "power2.out" });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <article className="tile" ref={box} onClick={onClick}>
      {/* IMAGE PREVIEW */}
      <div className="thumb">
        <img ref={img} src={project.thumb} alt={project.title} loading="lazy" />
      </div>

      {/* TEXT BELOW */}
      <h3 className="title">{project.title}</h3>
      <div className="tag">{project.tag}</div>
    </article>
  );
}
