import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Recommendations:</h3>
      {list.map(recommendations => {
        return (
          <NavLink
            to={`/recommendations/${recommendations.id}`}
            key={recommendations.id}
            activeClassName="saved-active"
          >
            <span className="saved-recommendations">{recommendations.strain}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default SavedList;