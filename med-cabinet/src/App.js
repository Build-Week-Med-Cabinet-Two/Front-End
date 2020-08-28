import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import HeaderKS from "./components/HeaderKS";
import RegistrationKS from "./components/RegistrationKS";
import LoginKS from "./components/LoginKS";
import PrivateRoute from './utils/PrivateRoute';
import UserData from "./components/UserData.js";
import LandingPageKS from "./components/LandingPageKS";
import Recommendations from "./components/Recommendations/Recommendations.js";
import SavedList from "./components/Recommendations/SavedList.js";


// function App() {
//   const [user, setUser] = useState({ username: null, token: null });
//   console.log(user);
//   return (
//     <Router>
//       <div className="App">
//         <HeaderKS user={user} setUser={setUser} />
//         <Switch>
//           <Route exact path="/">
//             {user.username === null ? (
//               <LandingPageKS />
//             ) : (
//               <UserData user={user} />
//             )}
//           </Route>
//           <Route path="/register">
//             {user.username === null ? (
//               <RegistrationKS setUser={setUser} />
//             ) : (
//               <Redirect to="/" />
//             )}
//           </Route> 
//           <Route path="/login">
//             {user.username === null ? (
//               <LoginKS setUser={setUser} />
//             ) : (
//               <Redirect to="/" />
//             )}
//           </Route> 
//            <PrivateRoute exact path='/UserData' component={UserData} />

//         </Switch>
//       </div>
//     </Router>
//   );
// }

function App() {
  const [user, setUser] = useState({ username: null, token: null });
  return (
    <Router>
      <div className="App">
      
      <HeaderKS user={user} setUser={setUser}/>
        <Route exact path="/" component={LandingPageKS} />
        <Route path="/login" component={LoginKS} />
        <Route path="/register" component={RegistrationKS} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/savedList" component={SavedList} />
         
        <PrivateRoute exact path='/protected' component={UserData} />
      </div>
    </Router>
  );
}

export default App;

