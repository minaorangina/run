'use strict';

export const GET_ARRIVALS = "GET_ARRIVALS";
export const GET_ARRIVALS_REQUEST = "GET_ARRIVALS_REQUEST";
export const GET_ARRIVALS_SUCCESS = "GET_ARRIVALS_SUCCESS";
export const GET_ARRIVALS_FAILURE = "GET_ARRIVALS_FAILURE";
export const SET_STATE = "SET_STATE";
import axios from 'axios';

export function getArrivals (mode) {

    return (dispatch) => {
        dispatch(getArrivalsRequest(mode));

        axios.get('/getArrivals?direction=home&mode=' + mode)
            .then((response) => {

                dispatch(getArrivalsSuccess(mode, response.data));
            })
            .catch((error) => {
                console.log(error);
                dispatch(getArrivalsFailure(mode, error.data));
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
