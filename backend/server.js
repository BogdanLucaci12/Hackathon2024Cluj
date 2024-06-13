const express = require('express');
require("dotenv").config();
const app = express();
const port = 3001;
const OpenAI = require('openai');
const bodyParser=require('body-parser');
const cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
const openai = new OpenAI({
    organization: "org-qu5vgmT70XWKYZrBXPXbYN5l",
    project: "proj_NnzQNOXctysmgJVbHghYUt8x",
    apiKey: process.env.OPEN_AI_KEY
});
app.get('/', async (req, res) => {
    try {
        return res.status(200).json({
            message: "Working"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "An error occurred"
        });
    }
});

app.post('/generate-text', async (req, res) => {
    
    if (req.body.age === "" || req.body.storyType === "") { return res.status(400).json({ error: "Age and storyType are required" }); }

    try {
        
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Tell me 3 story for a ${req.body.age} year old child about ${req.body.storyType}` }],
            stream: true,
        });
        // Set the response headers to handle streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        // Use an async generator to handle the streaming response
        for await (const chunk of stream) {
            res.write(chunk.choices[0]?.delta?.content || "");
        }
        return res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
