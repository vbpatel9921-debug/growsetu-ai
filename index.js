const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔐 Growsetu config
const TOKEN = "r3qZxcSLrVxfzo6vSg8lSEvBpKSvlmdx3pUmtE5Lo7vOfXOjJR6OSylKcCO0akEm";
const BASE_URL = "https://growsetu.in/api";
const VENDOR_UID = "11b5051f-4dd9-4f4b-ba23-7c88a69ff946";

// ===== Webhook =====
app.post("/webhook", async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const phone = req.body?.contact?.phone_number;
    const message = req.body?.message?.body || "";

    console.log("Phone:", phone);
    console.log("Message:", message);

    let reply = "❌ Command समझ नहीं आया";

    if (message.toLowerCase().includes("hello")) {
      reply = "👋 Hello AI Employee ready";
    }

    if (message.toLowerCase().includes("campaign")) {
      reply = "🚀 Campaign start कर रहा हूँ";
    }

    if (message.toLowerCase().includes("data")) {
      reply = "📊 Data निकाल रहा हूँ";
    }

    // ===== Send message via Growsetu API =====
    if (phone) {
      await axios.post(
        `${BASE_URL}/${VENDOR_UID}/contact/send-message?token=${TOKEN}`,
        {
          phone_number: phone,
          template_name: "hello_world",   // 👈 अपना template डालना
          template_language: "en",
          field_1: "Hello from AI 🚀"
        }
      );
    }

    res.sendStatus(200);

  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// ===== Test =====
app.get("/", (req, res) => {
  res.send("🚀 AI Employee Running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
