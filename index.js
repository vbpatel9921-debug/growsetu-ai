const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Growsetu AI Running");
});

app.get("/run", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
