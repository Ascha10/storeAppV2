import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'


export const authContext = createContext();

export function AuthProvider({children}) {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.getItem("jwtToken");
      const decodedUserInfo = jwt_decode(token);
      setAuth(decodedUserInfo)
      console.log(decodedUserInfo);
    }
  }, [])

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>

  )
}
