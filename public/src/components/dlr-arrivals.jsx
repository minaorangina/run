'use strict';

import React                     from 'react';
import { connect }               from 'react-redux';
import moment                    from 'moment';
import $                         from 'jquery';
import DLR                       from './dlr.jsx';


export const DLRArrivals = React.createClass({

    componentWillMount () {


    },

    render () {

        return (
            <div>
                <h1>DLR goes here</h1>
                <DLR { ...this.props } />
            </div>
        );
    }
});

function mapStateToProps (state) {

    return {
        arrivals: state.arrivals
    };
}


export const DLRArrivalsContainer = connect(mapStateToProps)(DLRArrivals);
