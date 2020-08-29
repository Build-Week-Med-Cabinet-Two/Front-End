import React from "react";
import { Link } from "react-router-dom";
import "./HeaderKS.scss";
import Logo from "./Logo";
function HeaderKS(props) {
  return (
    <header>
      <Link to="/">
        <h1>
          <Logo id="headerLogo" alt="MedCabinet Logo" />
          MedicineCabinet
        </h1>
      </Link>
      <nav>
        {props.user.username === null ? (
          <>
            <Link to="/register">register</Link>
            <Link to="/login">log in</Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                props.setUser({ username: null, token: null });
              }}
            >
              logout ({props.user.username})
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
export default HeaderKS;
