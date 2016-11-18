export const GET_ARRIVALS = "GET_ARRIVALS";
export const GET_ARRIVALS_REQUEST = "GET_ARRIVALS_REQUEST";
export const GET_ARRIVALS_SUCCESS = "GET_ARRIVALS_SUCCESS";
export const GET_ARRIVALS_FAILURE = "GET_ARRIVALS_FAILURE";
export const GENERIC_FAILURE = "GENERIC_FAILURE";

import { socket } from './app.jsx';

export function getArrivals (mode, direction) {

    return (dispatch) => {

        dispatch(getArrivalsRequest(mode));

        socket.emit(mode, direction);

        socket.on('dlr:arrivals', (arrivals) => {

            dispatch(getArrivalsSuccess('dlr', arrivals.direction, arrivals.data));
        });
        socket.on('bus:arrivals', (arrivals) => {

            dispatch(getArrivalsSuccess('bus', arrivals.direction, arrivals.data));
        });
        socket.on('dlr:failure', (error) => {

            dispatch(getArrivalsFailure('dlr', error));
        });
        socket.on('bus:failure', (error) => {

            dispatch(getArrivalsFailure('bus', error));
        });
        socket.on('error', (error) => {

            dispatch(genericFailure(error));
        });
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
