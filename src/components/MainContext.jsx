import { createContext } from 'react';
const MainContext = createContext({
    response: "",
    setResponse: () => { },
});
export default MainContext;