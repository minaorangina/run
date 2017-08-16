import React, { PropTypes } from 'react';
import moment from 'moment';

const normaliseStationName = (data) => {
    if (data.length > 0) {
        return name.replace(' DLR Station', '');
    }
};

const Card = ({ mode, origin, destination, data, direction, last_updated }) => {
    let header;
    if (mode.toLowerCase() === 'train') {
        header = `from ${origin}` || 'Got nothing...';
    } else {
        header = destination || 'Got nothing...';
    }
    return (
        <div className={ `card ${mode.toLowerCase()} ${direction || ''}` }>
            <h3>
                { mode }: { header }
            </h3>
            <p className="last-updated">Last updated: { moment(last_updated).format('HH:mm') }</p>
            {
                data.map((arrival, i) => {
                    const time = moment.duration(arrival.timeToStation, 'seconds')
                    .humanize(true);
                    return (
                        <ArrivalItem
                            key={ i }
                            mode={ mode }
                            arrival={ arrival }
                            destination={ destination }
                            time={ time }
                        />
                    );
                })
            }
        </div>
    );
};

const ArrivalItem = ({ mode, arrival, destination, time }) => {
    if (mode.toLowerCase() === 'train') {
        return (
            <div className="arrival-item-container">
                 <div className='arrival-item' >
                 { `${arrival.std} to ${destination}` }
                 </div>
                 <div className='info'>{ arrival.etd }</div>
             </div>
        );
    } else {
        return (
            <div className="arrival-item-container">
            { mode.toLowerCase() === 'bus' && `${arrival.lineName} ` }
            { mode.toLowerCase() === 'dlr' && `${normaliseStationName(arrival.destinationName)} ` }
            <span className="time">{ time }</span>
            {
                mode.toLowerCase() === 'dlr' &&
                <div className="info">{ arrival.platformName }</div>
            }
            </div>
        );
    }
};

export default Card;

Card.propTypes = {
    mode: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    data: PropTypes.array,
    direction: PropTypes.string,
    last_updated: PropTypes.string
};
ArrivalItem.propTypes = {
    mode: PropTypes.string,
    arrival: PropTypes.object,
    destination: PropTypes.string,
    time: PropTypes.string
};
