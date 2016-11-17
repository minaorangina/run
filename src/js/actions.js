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
            console.log("got dlr arrivals");
            dispatch(getArrivalsSuccess('dlr', arrivals));
        });
        socket.on('bus:arrivals', (arrivals) => {
            console.log("got bus arrivals");
            console.log(arrivals);
            dispatch(getArrivalsSuccess('bus', arrivals));
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

export function getArrivalsSuccess (mode, data) {

    return {
        type: GET_ARRIVALS_SUCCESS,
        mode,
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
