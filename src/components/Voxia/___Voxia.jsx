/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import MainContext from "../MainContext";
import './Voxia.scss';

export default function Voxia() {

    const { response } = useContext(MainContext);
    const [audioPath, setAudioPath] = useState("")

    const encodedParams = new URLSearchParams();
    encodedParams.set('voice_code', 'en-US-1');
    encodedParams.set('text', `'${response}'`);
    encodedParams.set('speed', '1.00');
    encodedParams.set('pitch', '1.00');
    encodedParams.set('output_type', 'audio_url');

    const callVoxia = async () => {

        const options = {
            method: 'POST',
            url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '0719995d05msh8c45fba8fd2223dp171cb7jsne70c34185e05',
                'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            console.log(response.data.result.audio_url);
            setAudioPath(response.data.result.audio_url)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        callVoxia();
    }, [response])

    return (
        <div className="voxia">
            <div className="hidden">
                ...
            </div>

            <p>V310</p>
            <audio src={audioPath} controls autoPlay></audio>
            {response}
        </div>
    )
}