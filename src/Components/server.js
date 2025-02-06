// const express = require("express");
// const cors = require("cors");
// const Groq = require("groq-sdk");

// const app = express();
// const port = 5000; // Choose any available port

// app.use(cors());
// app.use(express.json());

// const groq = new Groq({ apiKey: "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" });

// app.post("/api/groq", async (req, res) => {
//     try {
//         const { message } = req.body;

//         const chatCompletion = await groq.chat.completions.create({
//             messages: [{ role: "user", content: message }],
//             model: "llama-3.3-70b-versatile",
//         });

//         res.json({ response: chatCompletion.choices[0]?.message?.content || "" });
//     } catch (error) {
//         console.error("Groq API Error:", error);
//         res.status(500).json({ error: "Failed to fetch response from Groq API" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
