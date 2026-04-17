const express = require("express");
const axios = require("axios");

const app = express();   // ✅ ये missing था (main error)
app.use(express.json());

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("🚀 Growsetu AI Running");
});

// =======================
// WEBHOOK
// =======================
app.post("/webhook", async (req, res) => {
  try {
    console.log("📩 Webhook Data:", JSON.stringify(req.body));

    const phone = req.body.contact?.phone_number;
    const message = req.body.body || "no message";

    let reply = "";

    if (message.toLowerCase().includes("hi")) {
      reply = "👋 Hello! Main AI Employee hoon 🚀";
    } 
    else if (message.toLowerCase().includes("map")) {
      reply = "🗺 Google Maps data nikal raha hoon...";
    } 
    else {
      reply = "🤖 Command samajh nahi aaya";
    }

    // =======================
    // SEND MESSAGE
    // =======================
    const API_URL = "https://growsetu.in/api";
    const TOKEN = "TCRQcpIo8Ii9me5rFt8xJBgwyf7SqeQxGz79VjrgxWwmDBtuvoZ7YY9GmxzPzLdu";
    const VENDOR_UID = "11b5051f-4dd9-4f4b-ba23-7c88a69ff946";

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
