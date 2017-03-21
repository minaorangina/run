import React, { PropTypes } from 'react';

export default function Train ({ data, direction, origin, destination }) {

    const arrivals = data.length > 0 && data.map((arrival, i) => {
        return (
            <div className="arrival-item" key={ i }>
                { `${arrival.std} to ${destination}` }
                <div className="info">{ arrival.etd }</div>
            </div>
        );
    });

    return (
        <div className='card'>
            <h3>
                { `Train: ${ data.length === 0 ? 'Got nothing...' : `from ${origin}`}` }
            </h3>
            { arrivals }
        </div>
    );
}
Train.propTypes = {
    data: PropTypes.array,
    direction: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string
};
