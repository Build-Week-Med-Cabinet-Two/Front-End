import React, { useState } from "react";
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
import UserData from "./components/UserData.js";

function App() {
  const [user, setUser] = useState({ username: null, token: null });
  console.log(user);
  return (
    <Router>
      <div className="App">
        <HeaderKS user={user} />
        <Switch>
          <Route exact path="/">
            <UserData />
          </Route>
          <Route path="/register">
            {user.username === null ? (
              <RegistrationKS setUser={setUser} />
            ) : (
              <Redirect to="/" />
            )}
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
