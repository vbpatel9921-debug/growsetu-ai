const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("🚀 Growsetu AI Employee Running");
});

// =======================
// WEBHOOK (MAIN AI LOGIC)
// =======================
app.post("/webhook", async (req, res) => {
  try {
    console.log("📩 Full Webhook Data:", JSON.stringify(req.body));

    // =======================
    // EXTRACT PHONE
    // =======================
    const phone = req.body.contact?.phone_number;

    // =======================
    // EXTRACT MESSAGE (IMPORTANT FIX)
    // =======================
    const message =
      req.body?.whatsapp_webhook_payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body
      || "no message";

    console.log("📩 Message:", message);

    // =======================
    // AI COMMAND SYSTEM
    // =======================
    let reply = "";

    if (message.toLowerCase().includes("hi")) {
      reply = "👋 Hello! Main Growsetu AI Employee hoon 🚀";
    } 
    else if (message.toLowerCase().includes("map")) {
      reply = "🗺 Google Maps se data nikal raha hoon...";
    }
    else if (message.toLowerCase().includes("data")) {
      reply = "📊 Data process ho raha hai...";
    }
    else {
      reply = "🤖 Command samajh nahi aaya";
    }

    // =======================
    // SEND MESSAGE BACK (Growsetu API)
    // =======================
    const API_URL = "https://growsetu.in/api/send-message";

    const TOKEN = "PUT_YOUR_TOKEN_HERE";        // 👈 यहाँ अपना token डालो
    const VENDOR_UID = "PUT_YOUR_UID_HERE";     // 👈 यहाँ UID डालो

    await axios.post(
      API_URL,
      {
        phone_number: phone,
        message: reply
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        params: {
          uid: VENDOR_UID
        }
      }
    );

    console.log("✅ Reply Sent:", reply);

    res.sendStatus(200);

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.sendStatus(500);
  }
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
