import React from "react";
import StrainCard from "./StrainCard";
export default function Favorites(props) {
  return (
    <div className="favoritesContainer">
      <h2>favorites</h2>
      {props.favorites.length === 0 && (
        <p>you don't have any saved favorites</p>
      )}
      {props.favorites.map((f) => (
        <StrainCard key={f.strain} strain={f} favorites={props.favorites} />
      ))}
    </div>
  );
}
