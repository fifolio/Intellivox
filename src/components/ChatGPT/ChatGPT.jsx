import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';


export default function ChatGPT() {
    
    const [response, setResponse] = useState("");
    
    const openai = new OpenAIApi(
        new Configuration({
            apiKey: import.meta.env.VITE_API_KEY,
        })
    );
    
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello my friend" }],
    }).then(res => {
        setResponse(res.data.choices)
    });

    return (
        <>
            <h1>{response ? response : 'no response'}</h1>
        </>
    )
}