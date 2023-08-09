/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import MainContext from "../MainContext";
import {useSpeechSynthesis} from 'react-speech-kit'
import './Voxia.scss';

export default function Voxia() {

    const { response } = useContext(MainContext);

    const {speak} = useSpeechSynthesis();

    const handleClick = () => {
        speak({
            text: response
        })
    }

    useEffect(() => {handleClick()} ,[response])
 

    return (
        <div className="voxia">
            <div className="hidden">
            <button onClick={()=> handleClick()}>play</button>
            </div>
            <p>V210</p>
            {response}
        </div>
    )
}