const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = "YOUR_TOKEN_HERE";
const BASE_URL = "https://growsetu.in/api";
const VENDOR_UID = "YOUR_VENDOR_UID";

app.post("/run", async (req, res) => {
  try {
    const { phone, message } = req.body;

    const response = await axios.post(
      `${BASE_URL}/send-message`,
      {
        phone_number: phone,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    res.json({
      status: "✅ Message Sent",
      data: response.data
    });

  } catch (err) {
    console.error(err.message);
    res.json({ status: "❌ Error", error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));
