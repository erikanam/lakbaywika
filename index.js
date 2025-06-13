// ✅ Load .env only in development
if (process.env.NODE_ENV !== "production") {
    console.log("🧪 Development mode: loading .env");
    require("dotenv").config();
} else {
    console.log("🚀 Production mode: using Railway environment variables");
}

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing in environment variables");
    process.exit(1);
}

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// ✅ Health Check Route
app.get("/", (req, res) => {
    res.json({ message: "✅ OpenAI Translation API is running!" });
});

// ✅ Translation Route
app.post("/translate", async (req, res) => {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
        return res.status(400).json({ error: "Text and targetLang are required" });
    }

    try {
        console.log(`🔄 Translating: "${text}" to ${targetLang}`);

        const prompt = `Translate this into ${targetLang}:\n"${text}"`;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.3
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        const translation = response.data.choices[0].message.content.trim();
        res.json({ translatedText: translation });

    } catch (error) {
        console.error("❌ OpenAI Translation Error:", error.message);
        res.status(500).json({ error: "Translation failed", details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
