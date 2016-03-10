'use strict';

import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { getArrivals }    from './state/actions.js';
import makeStore          from './state/store.js';
import AppContainer       from './components/app-container.jsx';

require('./scss/main.scss');

export const store = makeStore();
console.log(">>>>", store.getState());

store.dispatch(getArrivals("dlr"));


ReactDOM.render(

    <Provider store={ store }>
        <AppContainer />
    </Provider>,
    document.getElementsByClassName("container")[0]
);
