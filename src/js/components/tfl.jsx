import React from 'react';
import moment from 'moment';

const TfL = ({ mode, data }) => {

    return (
        <div className={ mode.toLowerCase() }>
            <h4>

                { mode } from { data && data[0] && data[0].stationName }
            </h4>
            {
                data && data.map((arrival, i) => {
                    let time = moment.duration(arrival.timeToStation, 'seconds')
                                     .humanize(true);
                    return (
                        <p key={ i }>
                            { time }
                        </p>
                    );
                })
            }
        </div>
    );
};

export default TfL;
