'use strict';

import update from 'react-addons-update';
import axios from 'axios';
import { GET_ARRIVALS_REQUEST, GET_ARRIVALS_SUCCESS, GET_ARRIVALS_FAILURE, SET_STATE } from './actions.js';

const initialState = {
    direction: "home",
    bus: {
        arrivals: [],
        error: undefined
    },
    dlr: {
        arrivals: [],
        error: undefined
    },
    train: {
        arrivals: [],
        error: undefined
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
        console.log(action.mode);
        return update(state, {
            [action.mode]: { arrivals: { $set: action.data } },
            isFetching: { $set: action.isFetching }
        });

    case GET_ARRIVALS_FAILURE:

        return update(state, {
            [action.mode]: { error: { $set: action.error } },
            isFetching: { $set: action.isFetching }
        });

    case SET_STATE:

        console.log("setting state??");
        state.arrivals[action.mode] = action.state;
        return update(state, {
            arrivals: { [action.mode]: { $set: action.state } }
        });


    default:
        console.log("defaulttttttt");
        return state;
    }
}
