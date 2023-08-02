/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useContext, useEffect } from 'react';
import MainContext from '../MainContext';

export default function ChatGPT({ input }) {
    const { setResponse } = useContext(MainContext);
    
    const runChatGPT = async () => {
        const options = {
            method: 'POST',
            url: 'https://lemurbot.p.rapidapi.com/chat',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '0719995d05msh8c45fba8fd2223dp171cb7jsne70c34185e05',
                'X-RapidAPI-Host': 'lemurbot.p.rapidapi.com'
            },
            data: {
                "bot": "dilly",
                "client": "d531e3bd-b6c3-4f3f-bb58-a6632cbed5e2",
                "message": `"${input}"`
            }
        };
        if (input) {
            try {
                const response = await axios.request(options);
                setResponse(response.data?.data.conversation.output);
                // setResponse(returnedAPIdata.data)
            } catch (err) {
                console.log(err);
            }
        } else {
            return 'no data passed to the gpt'
        }
    };

    useEffect(() => { runChatGPT() }, [input])

    return null
}