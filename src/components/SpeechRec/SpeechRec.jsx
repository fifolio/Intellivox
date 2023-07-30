import { useState } from "react";
import ChatGPT from "../ChatGPT/ChatGPT";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

export default function SpeechRec() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    const handleStartStop = () => {
        if (!isListening) {
            recognition.start();
            setIsListening(true);
        } else {
            recognition.stop();
            setIsListening(false);
        }
    };

    recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");

        setTranscript(currentTranscript);
    };

    return (
        <div>
            <h1>Speech Recognition App</h1>
            <button onClick={handleStartStop}>
                {isListening ? "Stop Listening" : "Start Listening"}
            </button>
            <div>
                <textarea
                    rows="6"
                    cols="50"
                    value={transcript}
                    onChange={() => { }}
                    placeholder="Spoken words will appear here..."
                />
            </div>

            {isListening ? '' : <ChatGPT prompt={transcript} />} 

        </div>
    );
}