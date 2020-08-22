import React from "react";
import { Link } from "react-router-dom";
import "./HeaderKS.scss";
function HeaderKS(props) {
  return (
    <header>
      <h1>MedicineCabinet</h1>
      <nav>
        <Link to="/register">register</Link>
        <Link to="/login">log in</Link>
      </nav>
    </header>
  );
}
export default HeaderKS;
