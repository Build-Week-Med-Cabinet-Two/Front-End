import React from 'react';

const RecCard = props => {
  const { description, effects, flavors, rating, strain, type } = props.recommendations;
  return (
    <div className="rec-card">
      <h2>{strain}</h2>
      <div className="type">
        Type: <em>{type}</em>
      </div>
      <div className="rating">
        Rating: <strong>{rating}</strong>
      </div>
      <h3>Actors</h3>

      {effects.map(effects => (
        <div key={effects} className="effects">
          {effects}
        </div>
      ))}
    </div>
  );
};



export default RecCard;
