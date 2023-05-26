import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const userContext = createContext()
export default userContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/profile").then((response) => {
      setUser(response.data);
      setLoading(false);
    }).catch((error) => {
      setUser(error.response.data.error);
    });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </userContext.Provider>
  )
}
