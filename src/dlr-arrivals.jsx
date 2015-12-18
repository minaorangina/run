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

                self.setState({
                    DLRArrivals: data
                }, function () {

                    setTimeout(self.getDLRArrivals, 10000);
                });
            }
        });
    },

    render: function () {

        return (
            <div className='dlr'>
                <h3>West Ham</h3>
                <ul>
                    {
                        this.state.DLRArrivals.map(function (arrival, i) {

                            var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                            return <div key={ i }>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                        })
                    }
                </ul>
            </div>
        );
    }
})

module.exports = DLRArrivals;
