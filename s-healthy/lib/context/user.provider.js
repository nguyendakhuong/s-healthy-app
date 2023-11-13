import { useReducer } from "react";
import UserContext from "./user.context";
import UserReducer, { InitState } from "./user.reducer";

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, InitState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
