import { useState } from 'react';
import axios from 'axios';

export default function ChatGPT() {

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:4000/chat", {prompt})
        .then((res) => {
            setResponse(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <div className="res">{response}</div>
        </>
    )
} 