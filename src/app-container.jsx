"use strict";
var React = require('react');
var BusArrivals = require('./bus-arrivals.jsx');
var DLRArrivals = require('./dlr-arrivals.jsx');
var TrainArrivals = require('./train-arrivals.jsx');

var AppContainer = React.createClass({

    getInitialState: function () {

        return {
            busArrivals: [],
            DLRArrivals: [],
            trainArrivals: []
        };
    },

    updateState: function (transport, data) {

        this.setState({
            [transport]: data
        });
    },

    render: function () {

        return (
            <div>
                <BusArrivals arrivals={ this.state.busArrivals } updateState={ this.updateState } />
                <DLRArrivals arrivals={ this.state.DLRArrivals } updateState={ this.updateState } />
                <TrainArrivals arrivals={ this.state.trainArrivals } updateState={ this.updateState } />
            </div>
        );
    }
});

module.exports = AppContainer;
