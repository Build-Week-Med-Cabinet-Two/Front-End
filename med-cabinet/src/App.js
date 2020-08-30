import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import HeaderKS from "./components/HeaderKS";
import RegistrationKS from "./components/RegistrationKS";
import LoginKS from "./components/LoginKS";
import LandingPageKS from "./components/LandingPageKS";
import MyCollections from "./components/MyCollections";

function App() {
  const [user, setUser] = useState({ username: null, token: null });
  useEffect(() => {
    if (
      user.token === null &&
      localStorage.getItem("token") &&
      localStorage.getItem("username")
    ) {
      setUser({
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
      });
    }
  }, [user]);
  return (
    <Router>
      <div className="App">
        <HeaderKS user={user} setUser={setUser} />

        {user.username === null ? (
          <section className="contentSection">
            <Switch>
              <Route exact path="/">
                <LandingPageKS />
              </Route>
              <Route path="/login">
                <LoginKS setUser={setUser} />
              </Route>
              <Route path="/register">
                <RegistrationKS setUser={setUser} />
              </Route>
            </Switch>
          </section>
        ) : (
          <section className="contentSection loggedIn">
            <Redirect to="/" />
            <MyCollections user={user} />
          </section>
        )}
      </div>
    </Router>
  );
}

export default App;
