import * as React from "react";
import LayoutContainer from "./navigation";
import { UserProvider } from "./lib/context/user.context";
export default function App() {
  return (
    <UserProvider>
      <LayoutContainer />
    </UserProvider>
  );
}
