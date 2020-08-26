import React, { useState } from "react";
import StrainPopup from "./StrainPopup";
export default function StrainCard(props) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div
        key={props.strain.id}
        className="strainCard"
        onClick={() => setModal(!modal)}
      >
        {props.strain.strain}
      </div>
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
