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
// WEBHOOK GET (browser test)
// =======================
app.get("/webhook", (req, res) => {
  res.send("✅ Webhook is live");
});

// =======================
// WEBHOOK POST (Growsetu / WhatsApp)
// =======================
app.post("/webhook", async (req, res) => {
  try {
    console.log("📩 Webhook Data:", JSON.stringify(req.body));

    // Example: phone + message निकालना
    const phone = req.body.phone || "919XXXXXXXXX";
    const message = req.body.message || "Hello from AI 🚀";

    // =======================
    // SEND MESSAGE TO GROWSETU API
    // =======================
    const API_URL = "https://growsetu.in/api";
    const TOKEN = "r3qZxcSLrVxfzo6vSg8lSEvBpKSvlmdx3pUmtE5Lo7vOfXOjJR6OSylKcCO0akEm";   // 👈 यहाँ अपना token डालना
    const VENDOR_UID = "11b5051f-4dd9-4f4b-ba23-7c88a69ff946"; // 👈 यहाँ UID डालना

    const response = await axios.post(
      API_URL,
      {
        phone_number: phone,
        message: message
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

    console.log("✅ Message Sent:", response.data);

    res.json({
      status: "success",
      message: "Message sent from AI Employee 🚀"
    });

  } catch (error) {
    console.error("❌ Error:", error.message);

    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

// =======================
// MANUAL RUN API (UI से call)
// =======================
app.post("/run", async (req, res) => {
  try {
    const { phone, message } = req.body;

    console.log("👉 Manual Run:", phone, message);

    res.json({
      status: "✅ Command received (next step automation)"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
