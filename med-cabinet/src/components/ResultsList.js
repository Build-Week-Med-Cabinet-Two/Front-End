import React from "react";
import strainData from "../strainData";
import "./ResultsList.scss";
export default function ResultsList(props) {
  console.log(strainData[0]);

  const inputArray = Object.values(props.query);
  const numberOfFieldsFilledIn = inputArray.filter((v) => v.length > 0).length;
  const numberOfCharactersEntered = inputArray.join().length - 3;
  const sufficientInput =
    numberOfCharactersEntered > 7 && numberOfFieldsFilledIn > 1 ? true : false;
  let queryMatches = [];
  if (sufficientInput) {
    const fields = Object.keys(props.query).filter(
      (field) => props.query[field].length > 0
    );
    // strainData.forEach((strain) => {
    //   let matchCount = 0;
    //   fields.forEach((field) => {
    //     if (props.query[field]strain[field])
    //   });
    // });
  }
  queryMatches = [...new Set(queryMatches)];
  return (
    <div className="resultsList">
      <h2>results!</h2>
      {sufficientInput ? (
        queryMatches.map((id) => <p key={id}>{strainData[id].strain}</p>)
      ) : (
        <p>insufficient information</p>
      )}
    </div>
  );
}
