app.post("/webhook", async (req, res) => {
  try {
    console.log("📩 Webhook Data:", JSON.stringify(req.body));

    const phone = req.body.contact?.phone_number;
    const message = req.body.body || "no message";

    let reply = "";

    // =======================
    // AI COMMAND LOGIC
    // =======================
    if (message.toLowerCase().includes("hi")) {
      reply = "👋 Hello! Main Growsetu AI Employee hoon 🚀";
    } 
    else if (message.toLowerCase().includes("data")) {
      reply = "📊 Data extraction start ho gaya hai...";
    }
    else if (message.toLowerCase().includes("map")) {
      reply = "🗺 Google Maps se data nikal raha hoon...";
    }
    else {
      reply = "🤖 Command samajh nahi aaya, phir se try karo";
    }

    // =======================
    // SEND MESSAGE BACK
    // =======================
    const API_URL = "https://growsetu.in/api";
    const TOKEN = "r3qZxcSLrVxfzo6vSg8lSEvBpKSvlmdx3pUmtE5Lo7vOfXOjJR6OSylKcCO0akEm";
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
