import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import HeaderKS from "./components/HeaderKS";
import RegistrationKS from "./components/RegistrationKS";
import LoginKS from "./components/LoginKS";
import UserData from ".components/UserData.js";

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