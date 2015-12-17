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

        this.getBusArrivals();
    },

    getBusArrivals: function () {
        var self = this;
        
        $.ajax({
            url: '/getBusArrivals',
            success: function (data) {

                self.setState({
                    busArrivals: data
                }, function () {

                    setTimeout(self.getBusArrivals, 10000);
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
