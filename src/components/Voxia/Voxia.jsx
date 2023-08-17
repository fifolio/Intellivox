/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import MainContext from "../MainContext";
import './Voxia.scss';

export default function Voxia() {

    const { speak, voices } = useSpeechSynthesis()
    const { response } = useContext(MainContext);
    const [voiceIndex, setVoiceIndex] = useState(3);
    const voice = voices[voiceIndex] || null;




    const handleClick = () => {
        speak({
            text: response,
            voice: voice,
            rate: 1.4,
            pitch: 2,
        })
    }

    useEffect(() => { handleClick() }, [response])

    return (
        <div className="voxia">
            <div className="hidden">
                <button onClick={() => handleClick()}>play</button>
                <div className='speechSettings'>
                    <select
                        name="voice"
                        value={voiceIndex || ''}
                        onChange={(e) => {
                            setVoiceIndex(e.target.value)
                        }}
                    >
                        {voices.map((option, index) => (
                            <option key={option.voiceURI} value={index}>
                                {`${option.lang} - ${option.name} ${option.default ? '- Default' : ''}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <p>V600</p>
            {response}
        </div>
    )
}