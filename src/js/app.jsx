'use strict';

import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { getArrivals }    from './state/actions.js';
import makeStore          from './state/store.js';
import AppContainer       from './components/app-container.jsx';

require('../scss/main.scss');

export const store = makeStore();


ReactDOM.render(

    <Provider store={ store }>
        <AppContainer />
    </Provider>,
    document.getElementsByClassName("container")[0]
);
