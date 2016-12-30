import React from 'react';

export default function Train ({ data, destination }) {
    
    const arrivals = data.length > 0 && data.map((arrival, i) => {
        const trainDestination = arrival.destination.location[0].locationName;
        return (
            <div className="arrival-item" key={ i }>
                { `${arrival.std} to ${trainDestination}` }
                <div className="info">{ arrival.etd }</div>
            </div>
        );
    });

    return (
        <div className='card'>
            <h3>{ `Train: going to ${destination}` }</h3>
            { arrivals }
        </div>
    );
}
