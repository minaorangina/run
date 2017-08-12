import React, { PropTypes } from 'react';
import moment from 'moment';

const normaliseStationName = (name) => {

    return name.replace(' DLR Station', '');
};

const TfL = ({ mode, data, direction, last_updated }) => {

    const modeLowerCase = mode.toLowerCase();
    let arrivals = data.map((arrival, i) => {
        const time = moment.duration(arrival.timeToStation, 'seconds')
                         .humanize(true);
        return (
            <div key={ i } className="arrival-item-container">
                {modeLowerCase === 'bus' && `${arrival.lineName} `}
                {modeLowerCase === 'dlr' && `${normaliseStationName(arrival.destinationName)} `}
                <span className="time">{ time }</span>
                {
                    modeLowerCase === 'dlr' &&
                    <div className="info">{ arrival.platformName }</div>
                }
            </div>
        );
    });

    return (
        <div className={ `card ${modeLowerCase} ${direction || ''}` }>
            <h3>
                { mode }: { data.length > 0 && `from ${normaliseStationName(data[0].stationName)}` } { data.length === 0 && 'Got nothing...' }
            </h3>
            <p className="last-updated">Last updated: { moment(last_updated).format('HH:mm') }</p>
            { arrivals }
        </div>
    );
};

export default TfL;

TfL.propTypes = {
    mode: PropTypes.string,
    data: PropTypes.array,
    direction: PropTypes.string,
    last_updated: PropTypes.string
};
