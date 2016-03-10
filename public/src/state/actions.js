'use strict';
/*
- get dlr arrivals
- get bus arrivals
- get train arrivals

async:
- is fetching (spinner)
- has fetched (load info in, remove spinner, reset isfetching)
- has failed to fetch (display error)

*/

export function getArrivals (mode) {

    return {
        type: "GET_ARRIVALS_REQUEST",
        mode
    };
}

export function receiveArrivals (mode, data) {

    return {
        type: "RECEIVE_ARRIVALS",
        mode,
        data
    };
}

export function setState (state, mode) {

    return {
        type: "SET_STATE",
        state,
        mode
    };
}
