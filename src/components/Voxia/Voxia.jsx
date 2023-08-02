// import axios from 'axios';
import { useContext } from "react";
import MainContext from "../MainContext";

export default function Voxia() {
    const { response } = useContext(MainContext);


    return (
        <>
            <h1>{response}</h1>
        </>
    )
}