"use strict";
var React = require('react');

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

                            return <div key={ i }>Bus { arrival.lineName } to { arrival.destinationName } -> { arrival.timeToStation }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = BusArrivals;
