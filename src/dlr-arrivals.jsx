"use strict";
var React = require('react');
var moment = require('moment');
var $ = require('jquery');

var DLRArrivals = React.createClass({

    getInitialState: function () {

        return {
            DLRArrivals: []
        };
    },

    componentDidMount: function () {

        this.getDLRArrivals();
    },

    getDLRArrivals: function () {
        var self = this;

        $.ajax({
            url: '/getDLRArrivals',
            success: function (data) {
                
                var newData = data || [];

                self.setState({
                    DLRArrivals: newData
                }, function () {

                    setTimeout(self.getDLRArrivals, 10000);
                });
            }
        });
    },

    render: function () {

        var DLRArrivals = this.state.DLRArrivals;

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

                            return <div key={ i }><img src="static/dlr.jpg" width="20px"></img>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
})

module.exports = DLRArrivals;