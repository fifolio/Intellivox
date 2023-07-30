/* eslint-disable react/prop-types */
// import { createContext } from "react"
import { useContext } from "react";
import MainContext from "../MainContext";

export default function ChatGPT({prompt}) {

    const { setResponse } = useContext(MainContext);
    setResponse(prompt);

    return null
}