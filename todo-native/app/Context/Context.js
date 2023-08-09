import { createContext, useState } from "react";

const Context = createContext({});

export const AppContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("user");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const context = {
    userId,
    setUserId,
    username,
    setUsername,
    userLoggedIn,
    setUserLoggedIn,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;
