"use strict";
var React = require('react');
var BusArrivals = require('./bus-arrivals.jsx');
var DLRArrivals = require('./dlr-arrivals.jsx');


var AppContainer = React.createClass({

    render: function () {

        return (
            <div>
                <h3>The buses</h3>
                <BusArrivals />
                <DLRArrivals />
            </div>
        );
    }
});

module.exports = AppContainer;
