const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Growsetu AI Server Running");
});

// 👉 👇 यही जगह है (GET के नीचे, listen के ऊपर)
app.post("/run", async (req, res) => {
  return res.json({
    status: "✅ Growsetu automation ready (next step)"
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
