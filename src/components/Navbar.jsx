import React from "react";

function Navbar({ filter, setFilter }) {
  const options = ["All", "Computer Science", "Design", "Data Science"];

  return (
    <header className="navbar">
      <h2>My Portfolio</h2>
      <nav>
        {options.map(o => (
          <button
            key={o}
            className={filter === o ? "active" : ""}
            onClick={() => setFilter(o)}
          >
            {o}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
