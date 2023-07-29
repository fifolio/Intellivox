import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

export default function ChatGPT() {
    const [response] = useState("");

    async function fetchChatCompletion() {
        try {
            const configuration = new Configuration({
                apiKey: import.meta.env.VITE_API_API
            });

            const customAxios = axios.create({
                headers: {
                    'User-Agent': 'Mozilla/5.0', // Set a user agent that is allowed
                },
            });

            const openai = new OpenAIApi(configuration, '', customAxios);

            const chatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Hello ai" }]
            });

            console.log(chatCompletion.data.choices[0].message);
        } catch (error) {
            console.log(error.response || error);
        }        
    }

    useEffect(() => {
        fetchChatCompletion();
    }, []);

    
    return (
        <>
            <h1>{response ? response : 'no response'}</h1>
        </>
    )
}