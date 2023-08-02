import { useEffect, useState } from "react";
import ChatGPT from "../ChatGPT/ChatGPT.jsx";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

export default function SpeechRec() {
    const [isListening, setIsListening] = useState(false);
    const [tempTranscript, setTempTranscript] = useState("");
    const [input, setInput] = useState("");

    // ----------------- 

    const handleStartStop = () => {
        if (!isListening) {
            setIsListening(true);
            recognition.start();
        } else {
            setIsListening(false);
            recognition.stop();
        }
    };

    useEffect(() => {
        recognition.onresult = (event) => {
            const currentTranscript = Array.from(event.results).map((result) => result[0].transcript).join("");
            setTempTranscript(currentTranscript);
        };

        // Clean up the recognition on unmount
        return () => {
            recognition.onresult = null;
        };
    }, [tempTranscript]);


    useEffect(() => {
        if (!isListening) {
            setInput(tempTranscript); // Update the input state after the user stops speaking
            setTempTranscript(""); // Reset the temporary transcript for future use
        }
    }, [isListening]);

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
                    value={tempTranscript}
                    onChange={() => { }}
                    placeholder="Spoken words will appear here..."
                />
            </div>

            <ChatGPT input={input} />
        </div>
    )
}
