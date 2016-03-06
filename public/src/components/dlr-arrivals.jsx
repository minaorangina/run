'use strict';

import React     from 'react';
import moment    from 'moment';
import $         from 'jquery';


const DLRArrivals = React.createClass({

    componentWillMount () {

        this.getDLRArrivals();
    },

    getDLRArrivals () {
        var self = this;

        $.ajax({
            url: '/getTfLArrivals?mode=dlr',
            success: function (data) {

                var newData = data || [];

                self.props.updateState('DLRArrivals', newData);

                setTimeout(self.getDLRArrivals, 10000);
            }
        });
    },

    render () {

        var DLRArrivals = this.props.arrivals;

        return (
            <div className='dlr'>
                <h3>West Ham</h3>
                <div className={ DLRArrivals.length === 0 ? "" : "display-none" }>
                    Ain't got no departures!
                </div>
                <ul>
                    {
                        DLRArrivals.map(function (arrival, i) {

                            var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                            return <div key={ i }><img src="static/img/dlr.jpg" width="20px"></img>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
})

export default DLRArrivals;
