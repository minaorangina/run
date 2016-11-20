import React from 'react';
import moment from 'moment';

const normaliseStationName = (name) => {

    return name.replace(' DLR Station', '');
};

const TfL = ({ mode, data }) => {

    let modeLowerCase = mode.toLowerCase();
    return (
        <div className={ `card ${modeLowerCase}` }>
            <h3>
                { mode }: { data[0] && normaliseStationName(data[0].stationName) } { data.length === 0 && 'Got nothing...' }
            </h3>
            {
                data.map((arrival, i) => {
                    let time = moment.duration(arrival.timeToStation, 'seconds')
                                     .humanize(true);
                    return (
                        <div key={ i } className="arrival-item">
                            {modeLowerCase === 'bus' && `${arrival.lineName} `}
                            {modeLowerCase === 'dlr' && `${normaliseStationName(arrival.destinationName)} `}
                            <span className="time">{ time }</span>
                            {
                                modeLowerCase === 'dlr' &&
                                <div className="platform">{ arrival.platformName }</div>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default TfL;
