"use strict";
var React = require('react');
var BusArrivals = require('./bus-arrivals.jsx');
var DLRArrivals = require('./dlr-arrivals.jsx');
var TrainArrivals = require('./train-arrivals.jsx');

var AppContainer = React.createClass({

    render: function () {

        return (
            <div>
                <BusArrivals />
                <DLRArrivals />
                <TrainArrivals />
            </div>
        );
    }
});

module.exports = AppContainer;
