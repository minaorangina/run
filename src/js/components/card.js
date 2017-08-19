import React, { PropTypes } from 'react';
import moment from 'moment';

const normaliseStationName = (stationName, mode) => {
    console.log(mode)
    if (mode === 'dlr' && stationName.length > 0) {
        return stationName.replace(' DLR Station', '');
    }
    if (mode === 'train' && stationName !== 'London Bridge') {
        return stationName.replace('London', '');
    }
};

const Card = ({ mode, origin, destination, data, direction, last_updated }) => {
    let header;
    if (mode === 'train') {
        header = `${origin}` || 'Got nothing...';
    } else {
        header = destination || 'Got nothing...';
    }
    if (mode === 'train') {
        console.log("DATA", data)
    }
    return (
        <div className={ `card ${mode} ${direction || ''}` }>
            <p className="last-updated">Last updated: { moment(last_updated).format('HH:mm') }</p>
            <h3>
                { mode }: { `from ${normaliseStationName(header, 'dlr')}` }
            </h3>
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
                            finalDestination={ mode === 'train' && data.length > 0 && `${data[0].destination.location[0].locationName}` }
                            time={ time }
                        />
                    );
                })
            }
        </div>
    );
};

const ArrivalItem = ({ mode, arrival, finalDestination, time }) => {
    if (mode === 'train') {
        return (
            <div className="arrival-item-container">
                 <div className='arrival-item'>
                 { `${arrival.std} to ${normaliseStationName(finalDestination, mode)}` }
                 </div>
                 <div className='info'>{ arrival.etd }</div>
             </div>
        );
    } else {
        console.log("ARRIVAL", arrival)
        return (
            <div className="arrival-item-container">
            { mode === 'bus' && `${arrival.lineName} ` }
            <span className="time">{ time }</span>
            {
                mode === 'dlr' &&
                <div className="info">
                    { arrival.platformName }
                    {` - ${normaliseStationName(arrival.destinationName, mode)}`}
                </div>
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
    finalDestination: PropTypes.string,
    time: PropTypes.string
};
