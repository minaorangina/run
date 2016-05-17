'use strict';

export const GET_ARRIVALS = "GET_ARRIVALS";
export const GET_ARRIVALS_REQUEST = "GET_ARRIVALS_REQUEST";
export const GET_ARRIVALS_SUCCESS = "GET_ARRIVALS_SUCCESS";
export const GET_ARRIVALS_FAILURE = "GET_ARRIVALS_FAILURE";
export const SET_STATE = "SET_STATE";
import axios from 'axios';
import { socket } from '../app.jsx';

export function getArrivals (mode, direction) {

    return (dispatch) => {

        dispatch(getArrivalsRequest(mode));

        socket.emit(mode, direction);

        socket.on('dlr:arrivals', (arrivals) => {

            dispatch(getArrivalsSuccess('dlr', arrivals));
        });
        socket.on('dlr:failure', (error) => {

            dispatch(getArrivalsFailure('dlr', error));
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
        data,
        isFetching: false
    };
}

export function getArrivalsFailure (mode, error) {

    return {
        type: GET_ARRIVALS_FAILURE,
        mode,
        error,
        isFetching: false
    };
}

export function setState (state, mode) {

    return {
        type: SET_STATE,
        state,
        mode
    };
}
