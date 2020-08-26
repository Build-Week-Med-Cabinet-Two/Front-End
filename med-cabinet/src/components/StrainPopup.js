import React from "react";
import "./StrainPopup.scss";
export default function StrainPopup(props) {
  const { strain, ailment, effects, flavor, type, description } = props.strain;
  return (
    <div className="strainPopup" onClick={() => props.setModal(!props.modal)}>
      <div className="strainInfoBox" onClick={(e) => e.stopPropagation()}>
        <h2>
          <span>{strain} info</span>
          <button
            className="closeButton"
            onClick={() => props.setModal(!props.modal)}
          >
            X
          </button>
        </h2>
        <p>
          strain: {strain} ({type})
        </p>
        <p>ailments: {ailment}</p>
        <p>effects: {effects}</p>
        <p>flavor: {flavor}</p>
        <p>description: {description}</p>

        <button>add to favorites</button>
      </div>
    </div>
  );
}
