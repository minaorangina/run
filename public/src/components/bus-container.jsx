'use strict';

import React     from 'react';
import { Sorry } from './sorry.jsx';
import moment    from 'moment';
import $         from 'jquery';


const BusContainer = React.createClass({

    componentWillMount () {

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

        let busArrivals = this.props.arrivals.bus;
        console.log("busArrivals", busArrivals);
        return (
            <div className='bus'>
                <h3>St Barnabas Church</h3>
                {
                    this.props.arrivals === undefined ?

                        <Sorry />
                    :
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
                }
            </div>
        );
    }
});

export default BusContainer;
