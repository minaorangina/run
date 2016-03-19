'use strict';

import React     from 'react';
import moment    from 'moment';
import $         from 'jquery';


const TrainContainer = React.createClass({

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

        let train = this.props.arrivals.train;

        return (
            <div className='train'>
            {
                train.arrivals.length === 0 ?

                    <div>
                        <h3> No trains to { train.destination || "anywhere" }</h3>
                    </div>
                :
                    <div>
                        <h3>{ train.destination }</h3>
                        <ul>
                            {
                                train.arrivals.map(function (arrival, i) {

                                    var destination = train.destination;
                                    var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                                    return <div key={ i }><img src="img/rail.png" width="20px"></img> { destination } @ { arrival.std } -> </div>

                                })
                            }
                        </ul>

                    </div>
            }
            </div>
        );
    }
});

export default TrainContainer;
