import React, { createContext, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const updateUser = (userData) => {
    setUser(userData);
  };
  const updateToken = (userToken) => {
    setToken(userToken);
  };

  const value = {
    user,
    token,
    updateUser,
    updateToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
