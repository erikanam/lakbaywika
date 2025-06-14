import React, { useState } from "react";
import axios from "axios";

function Translator({ darkMode }) {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("Please enter text to translate.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://lakbaywika-production.up.railway.app/translate",
        {
          text,
          target: "tl", // ✅ Key fixed for Railway backend
        }
      );
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      setTranslatedText("❌ Translation failed. Please try again later.");
    }
    setLoading(false);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px",
  };

  const textAreaStyle = {
    width: "350px",
    height: "300px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: darkMode ? "#1a1a1a" : "#f8fbf7",
    color: darkMode ? "#fefaf5" : "#000",
    fontSize: "16px",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Tagalog Translator</h1>

      <div style={containerStyle}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Text..."
          style={textAreaStyle}
        />

        <textarea
          value={translatedText}
          readOnly
          placeholder="Tagalog Translation"
          style={textAreaStyle}
        />
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: darkMode ? "#333" : "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Translating..." : "Translate"}
      </button>
    </div>
  );
}

export default Translator;
