// store-making separated out for testing ease

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer, initialState as state } from './reducer';
import { getDirection } from './helpers';

let newState = { ...state };
newState.direction = getDirection();

export function makeStore (initialState) {

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextReducer = require('./reducer');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}

export const store = makeStore(newState);
