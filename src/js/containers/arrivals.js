import React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';
import { reverseDirection } from '../actions';
import Arrivals from '../components/arrivals.jsx';

const mapStateToProps = (state) => {
    return {
        bus: state.bus.arrivals,
        train: state.train.arrivals,
        dlr: state.dlr.arrivals,
        direction: state.direction
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDirection: () => {
            let newDirection = store.getState().direction === 'home' ? 'away' : 'home';
            dispatch(reverseDirection(newDirection));
        }
    };
};

const ArrivalsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Arrivals);

export default ArrivalsContainer;
