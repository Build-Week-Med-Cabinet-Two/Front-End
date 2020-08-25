import React from "react";
import { Link } from "react-router-dom";
import "./HeaderKS.scss";
function HeaderKS(props) {
  return (
    <header>
      <Link to="/">
        <h1>MedicineCabinet</h1>
      </Link>
      <nav>
        {props.user.username === null ? (
          <>
            <Link to="/register">register</Link>
            <Link to="/login">log in</Link>
          </>
        ) : (
          <Link
            to="/"
            onClick={() => props.setUser({ username: null, token: null })}
          >
            logout ({props.user.username})
          </Link>
        )}
      </nav>
    </header>
  );
}
export default HeaderKS;
