'use strict';

import $ from 'jquery';


const initialState = {
    direction: "home"
};

export default function reducer (state = initialState, action) {

    switch (action.type) {

        case "FETCH_ARRIVALS":
            var self = this;

            $.ajax({
                url: '/getTfLArrivals?mode=' + action.mode,

                success: function (data) {
                    // "SET_STATE"
                    // store.dispatch({ type: "SET_STATE", data: data, mode: action.mode });
                    setTimeout(self.getDLRArrivals, 10000);
                }
            });
            break;

        case "SET_STATE":

            // set some state
            break;
            
        default:
            return state;
    }
}
