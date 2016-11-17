import update from 'react-addons-update';

import {
    GET_ARRIVALS_REQUEST,
    GET_ARRIVALS_SUCCESS,
    GET_ARRIVALS_FAILURE,
    REVERSE_DIRECTION,
    GENERIC_FAILURE } from './actions.js';

export const initialState = {
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

export function reducer (state = initialState, action) {

    switch (action.type) {

    case GET_ARRIVALS_REQUEST:

        return update(state, {
            isFetching: { $set: true }
        });

    case GET_ARRIVALS_SUCCESS:

        return update(state, {
            [action.mode]: { arrivals: { $set: action.data } },
            isFetching: { $set: false }
        });

    case GET_ARRIVALS_FAILURE:

        return update(state, {
            [action.mode]: { error: { $set: action.error } },
            isFetching: { $set: false }
        });

    case GENERIC_FAILURE:

        return update(state, {
            error: { $set: action.error },
            isFetching: { $set: false }
        });

    case REVERSE_DIRECTION:

        return update(state, {
            direction: { $set: action.newDirection },
            bus: { arrivals: { $set: [] } },
            dlr: { arrivals: { $set: [] } },
            train: { arrivals: { $set: [] } }
        });

    default:

        return state;
    }
}
