const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
  "https://router.huggingface.co/v1/chat/completions",
  {
    model: "Qwen/Qwen2.5-7B-Instruct",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

res.json({
  success: true,
  reply: response.data.choices[0].message.content
});

  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message
    });
  }
});

module.exports = router;