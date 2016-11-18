import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { store }          from './store.js';
import { getArrivals }    from './actions.js';
import AppContainer       from './containers/app.jsx';

require('../scss/main.scss');
export const socket = io();

// store.dispatch(getArrivals('train'));
let direction = store.getState().direction;
store.dispatch(getArrivals('dlr', direction));
store.dispatch(getArrivals('bus', direction));

ReactDOM.render(

    <Provider store={ store }>
        <AppContainer />
    </Provider>,
    document.getElementsByClassName("container")[0]
);
