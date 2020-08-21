import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import "./HeaderKS.scss";
class HeaderKS extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  render() {
    return (
      <Router>
        <header>
          <h1>MC</h1>
          <nav>
            <NavLink to="/register">register</NavLink>
            <NavLink to="/login">log in</NavLink>
          </nav>
        </header>
      </Router>
    );
  }
}
export default HeaderKS;
