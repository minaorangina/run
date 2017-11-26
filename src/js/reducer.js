import {
    SET_DIRECTION,
    GET_ARRIVALS_REQUEST,
    GET_ARRIVALS_SUCCESS,
    GET_ARRIVALS_FAILURE,
    GENERIC_FAILURE } from './actions.js';

export const initialState = {
    direction: undefined,
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
        terminus: '',
        last_updated: undefined,
        error: undefined
    },
    isFetching: false,
    error: undefined
};

export function reducer (state = initialState, action) {

    switch (action.type) {

    case SET_DIRECTION:
        return { ...state, direction: action.direction };

    case GET_ARRIVALS_REQUEST:
        return { ...state, isFetching: true };

    case GET_ARRIVALS_SUCCESS: {
        const data = {
            ...state[action.mode],
            arrivals: action.mode === 'train' ? action.payload.android_data : action.payload.data,
            origin: action.payload.origin,
            destination: action.payload.destination,
            direction: action.direction,
            last_updated: action.payload.last_updated
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
