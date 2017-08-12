// store-making separated out for testing ease

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer } from './reducer.js';
// import { getDirection } from './helpers';

export function makeStore (initialState) {

    return createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}

export const store = makeStore();
