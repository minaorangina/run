'use strict';

import React     from 'react';
import moment    from 'moment';
import $         from 'jquery';
import DLR       from './dlr.jsx';


const DLRArrivals = React.createClass({

    componentWillMount () {

        this.getDLRArrivals();
    },

    getDLRArrivals () {
        var self = this;

        $.ajax({
            url: '/getTfLArrivals?mode=dlr',
            success: function (data) {

                var newData = data || [];

                self.props.updateState('DLRArrivals', newData);

                setTimeout(self.getDLRArrivals, 10000);
            }
        });
    },

    render () {

        return (
            <DLR />
        );
    }
})

export default DLRArrivals;
