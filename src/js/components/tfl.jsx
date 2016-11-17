import React from 'react';
import moment from 'moment';

const TfL = ({ mode, data }) => {
    console.log(data);
    let modeLowerCase = mode.toLowerCase();
    return (
        <div className={ modeLowerCase }>
            <h3>

                { mode } from { data[0] && data[0].stationName }
            </h3>
            {
                data.map((arrival, i) => {
                    let time = moment.duration(arrival.timeToStation, 'seconds')
                                     .humanize(true);
                    return (
                        <div key={ i } className="arrival-item">
                            {modeLowerCase === 'bus' && `${arrival.lineName} `}
                            {modeLowerCase === 'dlr' && `${arrival.destinationName.replace(' DLR Station', '')} `}
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
