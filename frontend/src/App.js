import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Translator from "./translator";
import Flashcards from "./flashcard";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function Homepage() {
  return (
    <main style={styles.homepage}>
      <div style={styles.contentBox}>
        <h1>Maligayang Pagdating sa Lakbay Wika</h1>
        <p>
          Ang Tagalog ay isa sa mga pangunahing wika ng Pilipinas at nagsisilbing batayan ng pambansang wika ng Pilipinas.
          Sa Lakbay Wika, maaari mong palalimin ang iyong kaalaman sa Tagalog gamit ang aming interactive na flashcards at tagasalin.
          Tuklasin ang mas epektibong paraan ng pag-aaral at pag-unawa sa wikang Tagalog!
        </p>
      </div>
    </main>
  );
}

function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav style={styles.navbar}>
      <div>
        <img src="/lakbaywika.png" alt="Lakbay Wika" style={styles.logo} />
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>PANGUNAHING PAHINA</Link></li>
        <li><Link to="/translator" style={styles.link}>PAGSASALIN</Link></li>
        <li><Link to="/flashcards" style={styles.link}>MATUTO GAMIT ANG FLASHCARDS</Link></li>
      </ul>
      <button onClick={toggleTheme} style={styles.themeToggle}>
        {darkMode ? (
          <SunIcon style={{ ...styles.icon, color: "yellow" }} />
        ) : (
          <MoonIcon style={{ ...styles.icon, color: "blue" }} />
        )}
      </button>
    </nav>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1a1a1a" : "#fefaf5";
    document.body.style.color = darkMode ? "#fefaf5" : "#1a1a1a";
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div style={styles.appContainer}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "2px solid #000",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "30px",
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    fontWeight: "bold",
  },
  logo: {
    height: "80px",
  },
  themeToggle: {
    padding: "10px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  icon: {
    width: "30px",
    height: "30px",
  },
  homepage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "80vh",
  },
  contentBox: {
    maxWidth: "800px",
    padding: "20px",
    border: "1px solid #000",
    borderRadius: "10px",
    background: "white",
    color: "black",
    textAlign: "center",
  },
};

export default App;
