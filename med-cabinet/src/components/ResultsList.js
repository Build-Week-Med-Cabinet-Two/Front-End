import React, { useState, useEffect, Fragment } from "react";
import strainData from "../strainData";
import StrainCard from "./StrainCard";
import "./ResultsList.scss";
export default function ResultsList(props) {
  const [matches, setMatches] = useState({
    "perfect matches": [],
    "close matches": [],
  });
  useEffect(() => {
    setMatches({ "perfect matches": [], "close matches": [] });
    strainData.forEach((strain) => {
      let matchCount = 0;
      Object.keys(props.query).forEach((field) => {
        const q = props.query[field].toLowerCase();
        if (q.length > 2 && strain[field].toLowerCase().indexOf(q) > -1) {
          matchCount++;
        }
      });
      if (matchCount === 4) {
        setMatches((m) => {
          return { ...m, "perfect matches": [...m["perfect matches"], strain] };
        });
      }
      if (matchCount === 3) {
        setMatches((m) => {
          return { ...m, "close matches": [...m["close matches"], strain] };
        });
      }
    });
  }, [props.query]);

  return (
    <div className="resultsList">
      <h2>search results</h2>

      {Object.keys(matches).map((matchType) => {
        if (matches[matchType].length > 0) {
          return (
            <Fragment key={matchType}>
              <h3>
                {matchType} ({matches[matchType].length}):
              </h3>
              <div className="strainsContainer">
                {matches[matchType].map((result) => (
                  <StrainCard
                    strain={result}
                    key={result.id}
                    favorites={props.favorites}
                    setFavorites={props.setFavorites}
                  />
                ))}
              </div>
            </Fragment>
          );
        } else return null;
      })}
      {matches["perfect matches"].length === 0 &&
      matches["close matches"].length === 0 &&
      Object.values(props.query).join("").length > 0 ? (
        <p>we couldn't find anything</p>
      ) : (
        <p>complete the form to find the good stuff</p>
      )}
    </div>
  );
}
