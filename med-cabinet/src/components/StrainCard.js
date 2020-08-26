import React, { useState } from "react";
import StrainPopup from "./StrainPopup";
import "./StrainCard.scss";
export default function StrainCard(props) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <button
        key={props.strain.id}
        className="strainCard flatButton"
        onClick={() => setModal(!modal)}
      >
        {props.strain.strain}
      </button>
      {modal && (
        <StrainPopup
          strain={props.strain}
          setModal={setModal}
          modal={modal}
          favorites={props.favorites}
          setFavorites={props.setFavorites}
        />
      )}
    </>
  );
}
