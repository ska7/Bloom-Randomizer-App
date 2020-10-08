import React, { useContext, useEffect } from "react";
import "./App.scss";

import { GlobalState } from "./context/GlobalState";

import UserLoggedIn from "./components/UserLoggedIn";
import UserLoggedOut from "./components/UserLoggedOut";
import Randomizer from "./pages/Randomizer";

function App() {
  return (
    <GlobalState>
      <Randomizer />
    </GlobalState>
  );
}

export default App;
