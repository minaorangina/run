'use strict';

import React     from 'react';
import moment    from 'moment';
import $         from 'jquery';


const TrainArrivals = React.createClass({

    componentWillMount () {

        this.getTrainArrivals();
    },

    shouldComponentUpdate (nextProps) {

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

    getTrainArrivals () {
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

    render () {

        return (
            <div className='train'>
            {
                this.props.arrivals.arrivals.length > 0?
                <div>
                    <h3>{ this.props.arrivals.destination }</h3>
                    <ul>
                        {
                            this.props.arrivals.arrivals.map(function (arrival, i) {

                                var destination = arrivals.destination;
                                var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                                return <div key={ i }><img src="static/img/rail.png" width="20px"></img> { destination } @ { arrival.std } -> </div>

                            })
                        }
                    </ul>

                </div> :
                <div>
                    <h3> No trains to { this.props.arrivals.destination || "anywhere" }</h3>
                </div>
            }
            </div>
        );
    }
});

export default TrainArrivals;
