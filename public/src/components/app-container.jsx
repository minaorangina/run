'use strict';

import React               from 'react';
import BusArrivals         from './bus-arrivals.jsx';
import DLRArrivals         from './dlr-arrivals.jsx';
import TrainArrivals       from './train-arrivals.jsx';
import DirectionButtons    from './direction-buttons.jsx';


const AppContainer = React.createClass({

    getInitialState () {

        return {
            busArrivals: [],
            DLRArrivals: [],
            trainArrivals: {
                arrivals: []
            },
            toHome: true
        };
    },

    updateState (transport, data) {

        this.setState({
            [transport]: data
        });
    },

    changeDirection () {

        this.setState({
            toHome: !this.state.toHome
        });
    },

    render () {

        return (
            <div>
                <BusArrivals arrivals={ this.state.busArrivals } updateState={ this.updateState } toHome={ this.state.toHome } />
                <DLRArrivals arrivals={ this.state.DLRArrivals } updateState={ this.updateState } toHome={ this.state.toHome } />
                <TrainArrivals arrivals={ this.state.trainArrivals } updateState={ this.updateState } toHome={ this.state.toHome } />
                <DirectionButtons />
            </div>
        );
    }
});

export default AppContainer;
