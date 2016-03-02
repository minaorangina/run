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
            trainArrivals: {arrivals: []},
            toHome: true
        };
    },

    updateState: function (transport, data) {

        this.setState({
            [transport]: data
        });
    },

    changeDirection: function () {

        this.setState({
            toHome: !this.state.toHome
        });
    },

    render: function () {

        return (
            <div>
                <BusArrivals arrivals={ this.state.busArrivals } updateState={ this.updateState } toHome={ this.state.toHome } />
                <DLRArrivals arrivals={ this.state.DLRArrivals } updateState={ this.updateState } toHome={ this.state.toHome } />
                <TrainArrivals arrivals={ this.state.trainArrivals } updateState={ this.updateState } toHome={ this.state.toHome } />
                <button onClick={ this.changeDirection }>
                    Switch direction
                </button>
            </div>
        );
    }
});

module.exports = AppContainer;
