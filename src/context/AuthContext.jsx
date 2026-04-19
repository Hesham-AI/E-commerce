import React from 'react'
import { createContext , useState } from 'react';

 export const authContext  = createContext(); 



export default function AuthContext({children}) {
    
  const [Token, setToken] = useState(localStorage.getItem("tkn"));
  console.log(Token);
  
    return (
    <authContext.Provider value={{ Token, setToken }}>
 {children}

    </authContext.Provider>
       
    
  )
}
