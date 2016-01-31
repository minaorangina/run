"use strict";
var React = require('react');
var moment = require('moment');
var $ = require('jquery');

var TrainArrivals = React.createClass({

    componentWillMount: function () {

        this.getTrainArrivals();
    },

    shouldComponentUpdate: function (nextProps) {

        var props = this.props;

        if (nextProps.arrivals.length > props.arrivals.length) {

            return true;
        } else {

            return nextProps.arrivals.every( function (arrival, i) {

                if (props.arrivals[i]) {

                    return arrival.std !== props.arrivals[i].std;
                }
            });
        }
    },

    getTrainArrivals: function () {
        var self = this;

        $.ajax({
            url: '/getTrainArrivals',
            success: function (data) {

                var newData = data || [];
                self.props.updateState('trainArrivals', newData);

                setTimeout(self.getTrainArrivals, 30000);
            }
        });
    },

    render: function () {
                
        var trainArrivals = this.props.arrivals;

        return (
            <div className='train'>
                <h3>Woolwich</h3>
                <div className={ trainArrivals.length === 0 ? "" : "display-none" }>
                    No trains to Erith
                </div>
                <ul>
                    {
                        trainArrivals.map(function (arrival, i) {

                            var destination = arrival.destination.location[0].locationName;
                            var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                            return <div key={ i }><img src="static/rail.png" width="20px"></img> { destination } @ { arrival.std } -> </div>

                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = TrainArrivals;
