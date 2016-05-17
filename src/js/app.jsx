'use strict';

import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { store }          from './state/store.js';
import { getArrivals }    from './state/actions.js';
import AppContainer       from './components/app-container.jsx';

require('../scss/main.scss');
export const socket = io();

// store.dispatch(getArrivals('train'));
store.dispatch(getArrivals('dlr', 'toHome'));
store.dispatch(getArrivals('bus', 'toHome'));

ReactDOM.render(

    <Provider store={ store }>
        <AppContainer />
    </Provider>,
    document.getElementsByClassName("container")[0]
);