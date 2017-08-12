
import {
    GET_ARRIVALS_REQUEST,
    GET_ARRIVALS_SUCCESS,
    GET_ARRIVALS_FAILURE,
    GENERIC_FAILURE } from './actions.js';
import { getDirection } from './helpers';

export const initialState = {
    direction: getDirection(),
    bus: {
        arrivals: [],
        origin: '',
        destination: '',
        last_updated: undefined,
        error: undefined
    },
    dlr: {
        arrivals: [],
        origin: '',
        destination: '',
        last_updated: undefined,
        error: undefined
    },
    train: {
        arrivals: [],
        origin: '',
        destination: '',
        last_updated: undefined,
        error: undefined
    },
    isFetching: false,
    error: undefined
};

export function reducer (state = initialState, action) {

    switch (action.type) {

    case GET_ARRIVALS_REQUEST:
        return { ...state, isFetching: true };

    case GET_ARRIVALS_SUCCESS: {
        const data = {
            ...state[action.mode],
            arrivals: action.data.data,
            origin: action.data.origin,
            destination: action.data.destination,
            direction: action.direction,
            last_updated: action.data.last_updated
        };
        return { ...state, isFetching: false, [action.mode]: data };
    }

    case GET_ARRIVALS_FAILURE:
        return {
            ...state,
            isFetching: false,
            [action.mode]: { ...state[action.mode], error: action.error }
        };

    case GENERIC_FAILURE:
        return {
            ...state,
            isFetching: false,
            error: action.error
        };

    default:
        return state;
    }
}
