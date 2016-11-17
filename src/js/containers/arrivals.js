import React from 'react';
import { connect } from 'react-redux';
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
        // change direction
    };
};

const ArrivalsContainer = connect(
    mapStateToProps
)(Arrivals);

export default ArrivalsContainer;
