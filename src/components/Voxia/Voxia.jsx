/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
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
                
            </div>
            <button onClick={()=> handleClick()}>play</button>
            <p>V210</p>
            {response}
        </div>
    )
}