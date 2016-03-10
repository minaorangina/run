'use strict';

import React  from 'react';
import moment from 'moment';

const DLR = React.createClass({

    render () {

        let props = this.props;
        console.log("props:", props.arrivals.dlr);

        return (
            <div className='dlr'>
                <h3>West Ham</h3>
                <div className={ props.arrivals.dlr.length === 0 ? "" : "display-none" }>
                    Ain't got no departures!
                </div>
                <ul>
                    {
                        props.arrivals.dlr.map(function (arrival, i) {

                            var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                            return <div key={ i }><img src="static/img/dlr.jpg" width="20px"></img>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
});

export default DLR;