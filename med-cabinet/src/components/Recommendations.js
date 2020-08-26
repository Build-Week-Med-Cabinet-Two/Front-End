import React, { useContext } from 'react';
import { RecsContext } from '../Contexts/RecsContext';

import RecCard from './RecCard';

const Recommendations = () => {
    const { recs, addRec } = useContext(RecsContext);

    return (
        <div className='recs-container'>
            {recs.map(rec => (
                <RecCard
                    key={rec.id}
                    rec={rec}
                    addRec={addRec}
                />
            ))}
        </div>
    )
}

export default Recommendations;