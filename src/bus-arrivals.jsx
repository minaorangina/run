"use strict";
var React = require('react');
var moment = require('moment');
var $ = require('jquery');

var BusArrivals = React.createClass({

    getInitialState: function () {

        return {
            busArrivals: []
        };
    },

    componentDidMount: function () {

        this.getBusArrivals();
    },

    getBusArrivals: function () {
        var self = this;

        $.ajax({
            url: '/getBusArrivals',
            success: function (data) {

                self.setState({
                    busArrivals: data
                }, function () {

                    setTimeout(self.getBusArrivals, 10000);
                });
            }
        });
    },

    render: function () {

        return (
            <div className='bus'>
                <h3>St Barnabas Church</h3>
                <ul>
                    {
                        this.state.busArrivals.sort(function (a, b) {

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
