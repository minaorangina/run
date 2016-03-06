'use strict';

import React     from 'react';
import moment    from 'moment';
import $         from 'jquery';


const BusArrivals = React.createClass({

    componentWillMount () {

        this.getBusArrivals();
    },

    getBusArrivals () {
        var self = this;

        $.ajax({
            url: '/getTfLArrivals?mode=bus',
            success: function (data) {

                var newData = data || [];

                self.props.updateState('busArrivals', newData)

                setTimeout(self.getBusArrivals, 10000);
            }
        });
    },

    render () {

        var busArrivals = this.props.arrivals;

        return (
            <div className='bus'>
                <h3>St Barnabas Church</h3>
                <div className={ busArrivals.length === 0 ? "" : "display-none" }>
                    Ain't got no departures!
                </div>
                <ul>
                    {
                        busArrivals.sort(function (a, b) {

                            if (a.expectedArrival < b.expectedArrival) {
                                return -1;
                            } else if (a.expectedArrival > b.expectedArrival) {
                                return 1;
                            } else {
                                return 0;
                            }
                        })
                        .map(function (arrival, i) {

                            var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                            return <div key={ i }><img src="static/img/bus.gif" width="20px"></img>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
});

export default BusArrivals;
