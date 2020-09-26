import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Randomizer from "./pages/Randomizer";
import About from "./pages/About";
import { GlobalState } from "./context/GlobalState";

function App() {
  return (
    <GlobalState>
      <Router>
        <Switch>
          <Route path="/" exact component={Randomizer} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </GlobalState>
  );
}

export default App;
