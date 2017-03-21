import React from 'react';
import moment from 'moment';

const normaliseStationName = (name) => {

    return name.replace(' DLR Station', '');
};

const TfL = ({ mode, data, direction }) => {

    const modeLowerCase = mode.toLowerCase();
    let arrivals = data.map((arrival, i) => {
        const time = moment.duration(arrival.timeToStation, 'seconds')
                         .humanize(true);
        return (
            <div key={ i } className="arrival-item">
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
            { arrivals }
        </div>
    );
};

export default TfL;
