/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import './voxia.scss';

export default function Voxia() {

    const { response } = useContext(MainContext);

    const [voice, setVoice] = useState(null);
    const [pitch] = useState(1.1);
    const [rate] = useState(1);
    const [volume] = useState(1);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        setVoice(voices[5]);
    }, []);

    // handle the play button
    const handlePlay = (input, voice, pitch, rate, volume) => {
        const synth = window.speechSynthesis;
        const inpt = new SpeechSynthesisUtterance(input)
        inpt.voice = voice;
        inpt.pitch = pitch;
        inpt.rate = rate;
        inpt.volume = volume;
        synth.speak(inpt);
    };
  
  
  const handleVoiceChange = (event) => {
        const voices = window.speechSynthesis.getVoices();
        setVoice(voices.find((v) => v.name === event.target.value));
    };

    useEffect(() => {

        if(response && voice ){
            setTimeout(() => {
                console.log("✅ Voxia talking...");
                handlePlay(response, voice, pitch, rate, volume)
            }, 50);
        } else {
            console.log("=> Voxia cant talk, Waiting for Response/Input");
        }
    }, [response, voice]);

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
                <span onClick={handlePlay}></span>
            </div>

            {response}
        </div>
    )
}