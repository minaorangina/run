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
                console.log(data[0]);
                var newData = data || [];

                self.setState({
                    trainArrivals: newData
                }, function () {

                    setTimeout(self.getTrainArrivals, 30000);
                });
            }
        });
    },

    render: function () {

        var trainArrivals = this.state.trainArrivals;

        return (
            <div className='train'>
                <h3>Woolwich</h3>
                <ul>
                    {

                        trainArrivals.map(function (arrival, i) {

                            var destination = arrival.destination.location[0].locationName;
                            var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                            return <div key={ i }>🚅 to { destination } -> { arrival.std }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = TrainArrivals;
