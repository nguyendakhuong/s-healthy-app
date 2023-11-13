import React, { createContext, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [lengthItem, setLengthItem] = useState("");

  const updateUser = (userData) => {
    setUser(userData);
  };
  const updateToken = (userToken) => {
    setToken(userToken);
  };
  const updateLengthItem = (lengthItem) => {
    setLengthItem(lengthItem);
  };

  const value = {
    user,
    token,
    lengthItem,
    updateUser,
    updateToken,
    updateLengthItem,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
