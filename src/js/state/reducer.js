'use strict';

import update from 'react-addons-update';
import axios from 'axios';
import { GET_ARRIVALS_REQUEST, GET_ARRIVALS_SUCCESS, GET_ARRIVALS_FAILURE, SET_STATE } from './actions.js';

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
    },
    isFetching: false,
    error: undefined
};

export default function reducer (state = initialState, action) {

    switch (action.type) {

        case GET_ARRIVALS_REQUEST:

            return update(state, {
                isFetching: { $set: action.isFetching }
            });

        case GET_ARRIVALS_SUCCESS:

            let fakeData = [{
                timeToStation: 230,
                lineName: "DLR",
                destinationName: "Woolwich"
            }];

            return update(state, {
                arrivals: { [action.mode]: { $set: fakeData } },
                isFetching: { $set: action.isFetching }
            });

        case GET_ARRIVALS_FAILURE:

            return update(state, {
                isFetching: { $set: action.isFetching },
                error: { $set: action.error }
            });

        case SET_STATE:

            console.log("setting state??");
            state.arrivals[action.mode] = action.state;
            return update(state, {
                arrivals: { [action.mode]: { $set: action.state } }
            });
            break;

        default:
            console.log("defaulttttttt");
            return state;
    }
}
