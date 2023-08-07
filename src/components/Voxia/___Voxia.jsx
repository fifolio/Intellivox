/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import MainContext from "../MainContext";
import './Voxia.scss';

export default function Voxia() {

    const { response } = useContext(MainContext);

    const [voice, setVoice] = useState(null);
    const [pitch] = useState(1.1);
    const [rate] = useState(1);
    const [volume] = useState(1);
    const [textChunks, setTextChunks] = useState([])


    

    useEffect(() => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        setVoice(voices[5]);
    }, []);

    useEffect(() => {
        if (response && voice) {
            const chunks = splitTextIntoChunks(response); // Implement this function to split text into manageable chunks
            setTextChunks(chunks);
        }
    }, [response, voice]);


    const handlePlay = () => {
        if (textChunks.length > 0) {
            handlePlayChunk(textChunks[0], 0);
        }
    };

    const handlePlayChunk = (chunk, chunkIndex) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.voice = voice;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;

        utterance.onend = () => {
            // Speak the next chunk if available
            if (chunkIndex < textChunks.length - 1) {
                handlePlayChunk(textChunks[chunkIndex + 1], chunkIndex + 1);
            }
        };

        synth.speak(utterance);
    };

    const handleVoiceChange = (event) => {
        const voices = window.speechSynthesis.getVoices();
        setVoice(voices.find((v) => v.name === event.target.value));
    };

    function splitTextIntoChunks(text) {
        const chunkSize = 500;
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substr(i, chunkSize))
        }
        return chunks;
    }

    return (
        <div className="voxia">
            <div className="hidden">
                <select value={voice?.name} onChange={handleVoiceChange}>
                    {window.speechSynthesis.getVoices().map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handlePlay(response, voice, pitch, rate, volume)}>play</button>
            <p>V210</p>
            {response}
        </div>
    )
}