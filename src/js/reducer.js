import update from 'react-addons-update';

import {
    GET_ARRIVALS_REQUEST,
    GET_ARRIVALS_SUCCESS,
    GET_ARRIVALS_FAILURE,
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
            direction: { $set: action.direction },
            isFetching: { $set: false }
        });

    case GET_ARRIVALS_FAILURE:

        return update(state, {
            [action.mode]: { error: { $set: action.error } },
            isFetching: { $set: false }
        });

    case GENERIC_FAILURE:
        console.error(action.error);
        return update(state, {
            error: { $set: action.error },
            isFetching: { $set: false }
        });

    default:
        return state;
    }
}
