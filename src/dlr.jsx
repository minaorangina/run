"use strict";
var React = require('react');
var moment = require('moment');

var DLR = React.createClass({

    getInitialState: function () {

        return {
            DLRArrivals: []
        };
    },

    componentDidMount: function () {

        this.getDLRArrivals();
    },

    getDLRArrivals: function () {
        var self = this;

        $.ajax({
            url: '/getDLRArrivals',
            success: function (data) {

                self.setState({
                    DLRArrivals: data
                }, function () {

                    console.log(self.state.DLRArrivals);
                    setTimeout(self.getDLRArrivals, 10000);
                });
            }
        });
    },

    render: function () {

        return (
            <div className='dlr'></div>
        );
    }
})

module.exports = DLR;
