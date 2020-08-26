import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPageKS.scss";
import kushman from "../kushman02.png";
export default function LandingPage(props) {
  return (
    <div className="landingPage">
      <h2>Welcome to MedCabinet!</h2>
      <h3>Our Mission</h3>
      <p>
        Our goal is to make it blindingly simple for you to find the strain of
        cannabis that is perfect for your needs and your preferences!
      </p>
      <img
        id="kushmanImage"
        src={kushman}
        alt="cannibas character using cellphone"
      />
      <h3>How?</h3>
      <p>
        Just tell us what qualities you would like in a cannabis strain: the
        ailments you want to treat, the effects you desire, and the flavor you
        crave. Then you are just one click away from finding the perfect strains
        to fit your needs!
      </p>

      <NavLink to="/register" className="ctaLink">
        <h2>sign up now!</h2>
      </NavLink>
    </div>
  );
}
