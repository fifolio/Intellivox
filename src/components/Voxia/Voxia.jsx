// import axios from 'axios';
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";

export default function Voxia() {
    const { response } = useContext(MainContext);
    const [audioUrl, setAudioUrl] = useState(null);

    const runVoxia = async () => {

        const options = {
            method: 'GET',
            url: 'https://text-to-speech-api3.p.rapidapi.com/speak',
            params: {
                text: `'${response}'`,
                lang: 'en'
            },
            headers: {
                'X-RapidAPI-Key': '0719995d05msh8c45fba8fd2223dp171cb7jsne70c34185e05',
                'X-RapidAPI-Host': 'text-to-speech-api3.p.rapidapi.com'
            },
            responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
            pitch: 2,   // Set the pitch to 0.8
            rate: 2.9,    // Increase the speech rate to 1.2
            voice: 'en-US',  // Specify a particular voice, if supported
            volume: 1,     // Adjust the volume to 0.7
        };

        try {
            const speech = await axios.request(options);
            const audioData = speech.data;
            const audioBlob = new Blob([audioData], {
                type: 'audio/mpeg',
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        runVoxia()
    }, [response])


    return (
        <>
            <div className="speech">
                {audioUrl && <audio autoPlay="true" controls src={audioUrl}></audio>}
            </div>
            <h1>{response}</h1>
        </>
    )
}