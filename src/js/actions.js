import { socket, registerListeners } from './socket';

export const GET_ARRIVALS = "GET_ARRIVALS";
export const GET_ARRIVALS_REQUEST = "GET_ARRIVALS_REQUEST";
export const GET_ARRIVALS_SUCCESS = "GET_ARRIVALS_SUCCESS";
export const GET_ARRIVALS_FAILURE = "GET_ARRIVALS_FAILURE";
export const GENERIC_FAILURE = "GENERIC_FAILURE";


export function getArrivals (mode, direction) {

    return (dispatch) => {

        socket.emit(mode, direction);
        dispatch(getArrivalsRequest(mode));
        registerListeners(dispatch);
    };
}

export function getArrivalsRequest (mode) {

    return {
        type: GET_ARRIVALS_REQUEST,
        mode,
        isFetching: true
    };
}

export function getArrivalsSuccess (mode, direction, data) {

    return {
        type: GET_ARRIVALS_SUCCESS,
        mode,
        direction,
        data
    };
}

export function getArrivalsFailure (mode, error) {

    return {
        type: GET_ARRIVALS_FAILURE,
        mode,
        error
    };
}

export function genericFailure (error) {

    return {
        type: GENERIC_FAILURE,
        error,
        isFetching: false
    };
}
