import React, { PropTypes } from 'react';
import moment from 'moment';

export default function Train ({ data, origin, destination, last_updated }) {

    const arrivals = data.length > 0 && data.map((arrival, i) => {
        const classnames = baseClass => {
            if (arrival.etd === 'Cancelled') {
                return `${baseClass} cancelled`;
            }
            if (arrival.etd !== 'On time') {
                return `${baseClass} delayed`;
            }
            return baseClass;
        };
        return (
            <div className="arrival-item-container" key={ i }>
                <div className={ classnames('arrival-item') } >
                { `${arrival.std} to ${destination}` }
                </div>
                <div className={ classnames('info') }>{ arrival.etd }</div>
            </div>
        );
    });

    return (
        <div className='card'>
            <h3>
                { `Train: ${ data.length === 0 ? 'Got nothing...' : `from ${origin}`}` }
            </h3>
            <p className="last-updated">Last updated: { moment(last_updated).format('HH.mm') }</p>
            { arrivals }
        </div>
    );
}
Train.propTypes = {
    data: PropTypes.object,
    direction: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    last_updated: PropTypes.string
};
