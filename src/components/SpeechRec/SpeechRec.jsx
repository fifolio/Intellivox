import { useEffect, useState } from "react";
import { useSpeechRecognition } from 'react-speech-kit';
import ChatGPT from "../ChatGPT/ChatGPT.jsx";

export default function SpeechRec() {
    
    const [input, setInput] = useState("");
    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
            setInput(result)
        }
    })

    return (
        <div>
            <h1>Voixa, </h1>

            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onMouseDown={listen} onMouseUp={stop}>Talk</button>

            {listening && <div>Go ahead I'm listening</div>}

            <ChatGPT input={input} />
        </div>
    )
}
