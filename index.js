const express = require("express");
const { chromium } = require("playwright");

const app = express();
app.use(express.json());

// 🔥 UI Panel (browser में control)
app.get("/", (req, res) => {
  res.send(`
    <h2>🤖 Growsetu AI Employee</h2>
    <input id="msg" placeholder="Command लिखो..." />
    <button onclick="send()">Run</button>
    <p id="res"></p>

    <script>
      async function send() {
        let message = document.getElementById("msg").value;

        let response = await fetch("/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message })
        });

        let data = await response.json();
        document.getElementById("res").innerText = data.reply;
      }
    </script>
  `);
});

// 🧠 AI Command System
app.post("/ai", async (req, res) => {
  const msg = req.body.message.toLowerCase();

  if (msg.includes("growsetu") || msg.includes("run")) {
    const result = await runGrowsetuTask();
    return res.json({ reply: result });
  }

  if (msg.includes("data")) {
    return res.json({ reply: "📊 Data extraction शुरू..." });
  }

  if (msg.includes("message")) {
    return res.json({ reply: "📩 Message भेजने की तैयारी..." });
  }

  res.json({ reply: "🤖 Command समझ नहीं आया" });
});

// 🚀 Growsetu Automation
async function runGrowsetuTask() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // 🔐 Login Page
    await page.goto("https://growsetu.in/login");

    // 👇 यहाँ अपना selector check करना पड़ेगा
    await page.fill('input[name="email"]', process.env.EMAIL);
    await page.fill('input[name="password"]', process.env.PASSWORD);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(5000);

    // 🔥 Example: Dashboard open
    // 👉 यहाँ आप actual काम डालोगे (button click / message)

    // await page.click('button.send-message');

    await browser.close();

    return "✅ Growsetu task complete हो गया";

  } catch (error) {
    await browser.close();
    return "❌ Error: " + error.message;
  }
}

// 🚀 Server start
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
