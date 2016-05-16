import React from 'react';
import { connect } from 'react-redux';
import Arrivals from './arrivals.jsx';

const mapStateToProps = (state) => {

    return {
        bus: state.arrivals.bus,
        train: state.arrivals.train,
        dlr: state.arrivals.dlr
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
