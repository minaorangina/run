'use strict';

import store from '../app.jsx';
import { setState, getArrivals } from './actions.js';
import $ from 'jquery';


const initialState = {
    direction: "home",
    arrivals: {
        bus: [
            {
                timeToStation: 230,
                lineName: "DLR",
                destinationName: "Woolwich"
            }
        ],
        train: {
            destination: "Erith",
            arrivals: [
                {
                    timeToStation: 400,
                    std: 300
                }
            ]
        }
    }
};

export default function reducer (state = initialState, action) {

    switch (action.type) {

        case "GET_ARRIVALS_REQUEST":


            let fakeData = [{
                timeToStation: 230,
                lineName: "DLR",
                destinationName: "Woolwich"
            }];

            let stateCopy = Object.assign({}, state);

            stateCopy.arrivals[action.mode] = fakeData;
            return stateCopy;

        case "SET_STATE":
            console.log("setting state??");
            state.arrivals[action.mode] = action.state;
            break;

        default:
            console.log("default");
            return state;
    }
}
