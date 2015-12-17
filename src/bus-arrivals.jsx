"use strict";
var React = require('react');
var moment = require('moment');

var BusArrivals = React.createClass({

    render: function () {

        return (
            <div className='bus'>
                <ul>
                    {
                        this.props.arrivals.sort(function (a, b) {

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

                            return <div key={ i }>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = BusArrivals;
