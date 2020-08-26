import React, { useState, useEffect } from "react";
import "./StrainPopup.scss";
export default function StrainPopup(props) {
  const { strain, ailment, effects, flavor, type, description } = props.strain;
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (
      props.favorites.filter((favorite) => favorite.strain === strain).length >
      0
    ) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [props.favorites, strain]);
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
        {isFavorite ? (
          <button
            onClick={() => {
              props.setFavorites([
                ...props.favorites.filter((f) => f.strain !== strain),
              ]);
            }}
          >
            remove from favorites
          </button>
        ) : (
          <button
            onClick={() => {
              props.setFavorites([...props.favorites, props.strain]);
            }}
          >
            add to favorites
          </button>
        )}
      </div>
    </div>
  );
}
