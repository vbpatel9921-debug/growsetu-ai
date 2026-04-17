const express = require("express");
const app = express();

// UI Page
app.get("/", (req, res) => {
  res.send(`
    <h2>🤖 Growsetu AI Employee</h2>
    <input id="msg" placeholder="Command लिखो..." />
    <button onclick="run()">Run</button>
    <p id="result"></p>

    <script>
      async function run() {
        const message = document.getElementById("msg").value;

        let res = await fetch("/run");
        let data = await res.json();

        document.getElementById("result").innerText = data.status;
      }
    </script>
  `);
});

// API Route
app.get("/run", (req, res) => {
  res.json({
    status: "✅ Command received (next step automation)"
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
