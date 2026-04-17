const express = require("express");
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Growsetu AI Server Running");
});

// AI Command route
app.post("/ai", async (req, res) => {
  const userMessage = req.body.message;

  // अभी simple reply (AI बाद में जोड़ेंगे)
  let response = "";

  if (userMessage.includes("data")) {
    response = "📊 मैं data निकाल रहा हूँ...";
  } else if (userMessage.includes("message")) {
    response = "📩 मैं सभी को message भेज रहा हूँ...";
  } else {
    response = "🤖 Command समझ नहीं आया";
  }

  res.json({ reply: response });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
