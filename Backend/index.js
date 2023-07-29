const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// setup openAI config
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(config);

// setup Server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT
app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 200,
        temperature: 0,
        prompt: prompt,
    });

    res.send(completion.data.choices[0].text)
});

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
})