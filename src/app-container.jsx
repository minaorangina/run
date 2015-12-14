"use strict";
var React = require('react');
var $ = require('jquery');

var AppContainer = React.createClass({

    getInitialState: function () {

        return {
            busArrivals: []
        };
    },

    componentDidMount: function () {

        this.getBusArrivals();
    },

    getBusArrivals: function () {

        var self = this;
        $.ajax({
            url: '/getBusArrivals',
            success: function (data) {

                self.setState({
                    busArrivals: data
                }, function () {
                    console.log(self.state);
                });
            }
        });
    },

    render: function () {

        var busArrivals = this.state.busArrivals;

        return (
            <div>
                <div className='bus'>
                    <ul>
                        {
                            busArrivals.map(function (arrival, i) {
                                console.log(arrival);
                                return <div key={ i }>{ arrival.timeToStation }</div>
                            })
                        }
                    </ul>

                </div>
            </div>
        );
    }
});

module.exports = AppContainer;
