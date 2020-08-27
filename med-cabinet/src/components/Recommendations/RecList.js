import React from "react";
import { Link } from "react-router-dom";
import RecCard from "./RecCard";

function RecList({ recommendations }) {
  return (
     <div className="movie-list">
      {
        recommendations.map(recommendations => (
          <Link key={recommendations.id} to={`/recommendations/${recommendations.id}`}>
            <RecCard recommendations={recommendations} />
          </Link>
        ))
      }
    </div>
  );
}

export default RecList;
