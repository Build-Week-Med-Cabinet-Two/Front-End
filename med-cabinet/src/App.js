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
// import UserData from "./components/UserData.js";
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
    /* todo:
    AVAILABLE INTAKES: "Vape", "Edible", "Smoke", "Topical"
    AVAILABLE TYPES: "Indica", "Sativa", "Hybrid"
    https://medcabinet2.herokuapp.com/

    CREATE a collection of recommendations:
      name your collection: -> "listName"
      "intakes": oneOf(["Vape", "Edible", "Smoke", "Topical"]),
      "types": oneOf["Indica", "Sativa", "Hybrid"],
      "issues": "optional user inputed issue(s)",
      "strain": "optional user inputed strain(s)",
      "effect": "optional user inputed effect(s)",
      "flavor": "optional user inputed flavor(s)"

    GET list of lists for user (display as "my collections")

    logged in homepage layout:
      "my collections" panel with cards for each saved collection and a "create new collection" button in the shape of a card
        create new collection button pops up a modal with a form
      clicking on a collection opens a modal with strain cards that are expandable

    --find out what happens if the token expired (optional/last)



    */
    <Router>
      <div className="App">
        <HeaderKS user={user} setUser={setUser} />
        <section className="contentSection">
          <Switch>
            <Route exact path="/">
              {user.username === null ? (
                <LandingPageKS />
              ) : (
                <MyCollections user={user} />
              )}
            </Route>
            <Route path="/register">
              {user.username === null ? (
                <RegistrationKS setUser={setUser} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/login">
              {user.username === null ? (
                <LoginKS setUser={setUser} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import Login from "./components/Login";
// import PrivateRoute from "../utils/PrivateRoute";
// //import DataForm from ".components/DataForm";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Route exact path="/" component={Login} />

//         <PrivateRoute exact path='/protected' component={} />
//       </div>
//     </Router>
//   );
// }

// export default App;
