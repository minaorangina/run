"use strict";
var React = require('react');
var moment = require('moment');
var $ = require('jquery');

var TrainArrivals = React.createClass({

    componentWillMount: function () {

        this.getTrainArrivals();
    },

    shouldComponentUpdate: function (nextProps) {

        var currentTrains = this.props.arrivals;
        var nextTrains = nextProps.arrivals;

        if (nextTrains.arrivals.length > currentTrains.arrivals.length) {

            return true;
        } else {

            return nextTrains.arrivals.every( function (arrival, i) {

                if (currentTrains.arrivals[i]) {

                    return arrival.std !== currentTrains.arrivals[i].std;
                }
            });
        }
    },

    getTrainArrivals: function () {
        var self = this;
        var direction = this.props.toHome ? 'toHome' : 'fromHome';

        $.ajax({
            url: '/getTrainArrivals?direction=' + direction,
            success: function (data) {

                var newData = data || {};
                self.props.updateState('trainArrivals', newData);

                setTimeout(self.getTrainArrivals, 30000);
            }
        });
    },

    render: function () {
    
        return (
            <div className='train'>
                <h3>{ this.props.arrivals.destination }</h3>
            {
                this.props.arrivals.arrivals.length > 0 ?
                <div>
                    <ul>
                        {
                            this.props.arrivals.arrivals.map(function (arrival, i) {

                                var destination = arrival.destination.location[0].locationName;
                                var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                                return <div key={ i }><img src="static/rail.png" width="20px"></img> { destination } @ { arrival.std } -> </div>

                            })
                        }
                    </ul>

                </div> :
                <div>
                    <h3>No trains</h3>
                </div>
            }
            </div>
        );
    }
});

module.exports = TrainArrivals;
