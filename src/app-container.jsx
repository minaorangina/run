"use strict";
var React = require('react');
var $ = require('jquery');
var BusArrivals = require('./bus-arrivals.jsx')


var AppContainer = React.createClass({

    getInitialState: function () {

        return {
            busArrivals: []
        };
    },

    componentDidMount: function () {

        var buses = setInterval(this.getBusArrivals, 10000);
    },

    getBusArrivals: function () {

        var self = this;
        $.ajax({
            url: '/getBusArrivals',
            success: function (data) {

                self.setState({
                    busArrivals: data
                }, function () {
                    console.log(self.state);
                });
            }
        });
    },

    render: function () {

        var busArrivals = this.state.busArrivals;

        return (
            <div>
                <h3>The buses</h3>
                <BusArrivals arrivals={ busArrivals }/>
            </div>
        );
    }
});

module.exports = AppContainer;
