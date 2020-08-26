import React, { useState } from "react";
import QueryForm from "./QueryForm";
import ResultsList from "./ResultsList";
import "./StrainNavigator.scss";
export default function StrainNavigator(props) {
  const [query, setQuery] = useState({
    ailment: "",
    effects: "",
    flavor: "",
    type: "",
  });
  return (
    <div className="strainNavigator">
      <QueryForm setQuery={setQuery} query={query} />
      <ResultsList query={query} />
    </div>
  );
}
