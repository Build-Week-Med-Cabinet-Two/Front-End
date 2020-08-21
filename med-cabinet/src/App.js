import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import HeaderKS from "./components/HeaderKS";
import RegistrationKS from "./components/RegistrationKS";
import LoginKS from "./components/LoginKS";

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderKS />
        <Switch>
          <Route exact path="/">
            <p>home</p>
          </Route>
          <Route path="/register">
            <RegistrationKS />
          </Route>
          <Route path="/login">
            <LoginKS />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
