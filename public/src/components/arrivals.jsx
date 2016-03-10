'use strict';

import React                     from 'react';
import { connect }               from 'react-redux';
import { store }                 from '../app.jsx';
import { getArrivals }           from '../state/actions.js';
import $                         from 'jquery';
import DLRContainer              from './dlr-container.jsx';
import BusContainer              from './bus-container.jsx';
import TrainContainer           from './train-container.jsx';


export const Arrivals = React.createClass({

    componentWillMount () {

        store.dispatch(getArrivals("dlr"));
    },

    render () {

        return (
            <div>
                <BusContainer { ...this.props } />
                <DLRContainer { ...this.props } />
                <TrainContainer { ...this.props } />
            </div>
        );
    }
});

function mapStateToProps (state) {

    return {
        arrivals: state.arrivals
    };
}


export const ArrivalsContainer = connect(mapStateToProps)(Arrivals);
