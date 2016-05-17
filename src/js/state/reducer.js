'use strict';

import update from 'react-addons-update';

import { GET_ARRIVALS_REQUEST, GET_ARRIVALS_SUCCESS, GET_ARRIVALS_FAILURE, GENERIC_FAILURE, SET_STATE } from './actions.js';

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

        return update(state, {
            [action.mode]: { arrivals: { $set: action.data } },
            isFetching: { $set: action.isFetching }
        });

    case GET_ARRIVALS_FAILURE:

        return update(state, {
            [action.mode]: { error: { $set: action.error } },
            isFetching: { $set: action.isFetching }
        });

    case GENERIC_FAILURE:

        return update(state, {
            error: { $set: action.error },
            isFetching: { $set: action.isFetching }
        });

    default:

        return state;
    }
}
