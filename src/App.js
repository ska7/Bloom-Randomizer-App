import React from "react";
import "./App.scss";
import { GlobalState } from "./context/GlobalState";
import Randomizer from "./pages/Randomizer";

function App() {
  return (
    <GlobalState>
      <Randomizer />
    </GlobalState>
  );
}

export default App;
