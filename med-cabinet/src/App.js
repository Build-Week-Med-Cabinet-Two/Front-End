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
import StrainNavigator from "./components/StrainNavigator";
import LandingPageKS from "./components/LandingPageKS";
import Favorites from "./components/Favorites";

function App() {
  const [user, setUser] = useState({ username: null, token: null });
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites !== null) {
      setFavorites(storedFavorites);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  return (
    <Router>
      <div className="App">
        <HeaderKS user={user} setUser={setUser} favorites={favorites} />
        <Switch>
          <Route exact path="/">
            {user.username === null ? (
              <LandingPageKS />
            ) : (
              <StrainNavigator
                favorites={favorites}
                setFavorites={setFavorites}
              />
            )}
          </Route>
          <Route path="/favorites">
            <Favorites favorites={favorites} setFavorites={setFavorites} />
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
