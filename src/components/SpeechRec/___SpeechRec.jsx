import { useEffect, useState } from "react";
import { useSpeechRecognition } from 'react-speech-kit';
import ChatGPT from "../ChatGPT/ChatGPT.jsx";

export default function SpeechRec() {

    const [tempInput, setTempInput] = useState("");
    const [input, setInput] = useState("");


    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setTempInput(result)
        }
    })

    useEffect(() => {
        
        let timeoutId;

        if (listening) {
            // If still listening, set a timeout to update the input after a delay
            timeoutId = setTimeout(() => {
                setInput(tempInput);
                stop()
            }, 3000); // Adjust the timeout value as needed
        } else {
            // If not listening, immediately update the input
            setInput(tempInput);
        }

        // Clear the timeout when the component unmounts or tempInput changes
        return () => {
            clearTimeout(timeoutId);
        };
    }, [tempInput, listening]);

    console.log(input);

    // const callVoxia = () => {
    //     setInput(`${import.meta.env.VITE_WELCOME_MESSAGE}`);
    //     setTimeout(() => {
    //     }, 15000);
    // }

    return (
        <div>
            <h1>Voixa, </h1>

            <textarea value={input} rows="20" onChange={(e) => setInput(e.target.value)} />
            {/* <button onClick={callVoxia}>Start Calling Voxia</button> */}
            <button onClick={listen}>Call Voxia</button>
            <button onClick={stop}>End Call</button>
            {listening ? <div><p>Go ahead I am listening</p></div> : <ChatGPT input={input} />}



        </div>
    )
}
