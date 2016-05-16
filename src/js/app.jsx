'use strict';

import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { store }          from './state/store.js';
import { getArrivals }    from './state/actions.js';
import AppContainer       from './components/app-container.jsx';

require('../scss/main.scss');


function hydrateApp (nextState, replace, callback) {
    store.dispatch(getArrivals('train'));
    store.dispatch(getArrivals('dlr'));
    store.dispatch(getArrivals('bus'));
    // callback();
}

ReactDOM.render(

    <Provider store={ store }>
        <AppContainer onEnter={ hydrateApp } />
    </Provider>,
    document.getElementsByClassName("container")[0]
);
