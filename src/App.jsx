import { useState } from 'react';
import MainContext from './components/MainContext';
import SpeechRec from './components/SpeechRec/SpeechRec';
import Voxia from './components/Voxia/Voxia';

export default function App() {

  const [response, setResponse] = useState("");
  const value = { response, setResponse };

  return (
    <>
      <MainContext.Provider value={value}>
        <SpeechRec />
        <Voxia />
      </MainContext.Provider>
    </>
  )
}