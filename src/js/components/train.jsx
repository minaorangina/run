import React from 'react';

export default function Train ({ data }) {

    const destination = 'this will be the destination';
    const arrivals = data.map((arrival, i) => {
        return (
            <div className="arrival-item" key={ i }>
                { arrival }
            </div>
        );
    });

    return (
        <div className='card'>
            <h3>{ `Train: ${destination}` }</h3>
            { arrivals }
        </div>
    );
}
