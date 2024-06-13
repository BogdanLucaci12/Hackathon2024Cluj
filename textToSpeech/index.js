require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();

// Configurare CORS
app.use(cors());

app.use(bodyParser.json());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/convert-text-to-speech", async (req, res) => {
	const { text } = req.body;

	if (!text) {
		return res.status(400).send("Text is required.");
	}

	try {
		const response = await openai.audio.speech.create({
			model: "tts-1",
			voice: "nova",
			input: text,
		});

		const buffer = Buffer.from(await response.arrayBuffer());
		const outputPath = path.join(__dirname, "output.mp3");
		fs.writeFileSync(outputPath, buffer);

		res.download(outputPath, "output.mp3", (err) => {
			if (err) {
				console.error("Failed to send file:", err);
			}
			fs.unlinkSync(outputPath);  // Clean up the file after sending it
		});
	} catch (error) {
		console.error("Speech synthesis failed.", error);
		res.status(500).send("Speech synthesis failed.");
	}
});

const PORT = 3002;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
