require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Translate } = require("@google-cloud/translate").v2;
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure API Key is set
if (!process.env.GOOGLE_API_KEY) {
    console.error("❌ GOOGLE_API_KEY is missing in .env file");
    process.exit(1);
}

// Initialize Google Translate API Client
const googleTranslate = new Translate({ key: process.env.GOOGLE_API_KEY });

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// ✅ Health Check Route
app.get("/", (req, res) => {
    res.json({ message: "✅ Translation API is running!" });
});

// ✅ Translation Route
app.post("/translate", async (req, res) => {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
        return res.status(400).json({ error: "Text and targetLang are required" });
    }

    try {
        console.log(`🔄 Translating: "${text}" to ${targetLang}`);
        const [translation] = await googleTranslate.translate(text, targetLang);
        res.json({ translatedText: translation });
    } catch (error) {
        console.error("❌ Google Translate API Error:", error);
        res.status(500).json({ error: "Translation failed", details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
