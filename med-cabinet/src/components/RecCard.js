import React, { useContext } from 'react';

const RecCard = props => {
    const { description, effects, flavor, rating, strain, type } = props.recs;

    return (
        <div className='rec-card'>
            <h2>{strain}</h2>
            Type: {type}
            Rating: {rating}
            Flavor Profile: {flavor}
            Effects: {effects}
            {description}

            <button onClick={() => saveRecommended(rec)}>Save Strain</button>
            
        </div>
    )
}
