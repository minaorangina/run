"use strict";
var React = require('react');
var moment = require('moment');
var $ = require('jquery');

var TrainArrivals = React.createClass({

    getInitialState: function () {

        return {
            trainArrivals: []
        };
    },

    componentDidMount: function () {

        this.getTrainArrivals();
    },

    getTrainArrivals: function () {
        var self = this;

        $.ajax({
            url: '/getTrainArrivals',
            success: function (data) {

                var newData = data || [];

                self.setState({
                    trainArrivals: newData
                }, function () {

                    setTimeout(self.getTrainArrivals, 10000);
                });
            }
        });
    },

    render: function () {

        return (
            <div className='train'>
                <h3>Woolwich</h3>
                <ul>
                    {
                        this.state.trainArrivals.map(function (arrival, i) {

                            var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                            return <div key={ i }>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = TrainArrivals;
