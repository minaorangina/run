import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { store }          from './store.js';
import { getArrivals }    from './actions.js';
import AppContainer       from './containers/app.js';

require('../scss/main.scss');

const { direction } = store.getState();
store.dispatch(getArrivals('train', direction));
store.dispatch(getArrivals('dlr', direction));
store.dispatch(getArrivals('bus', direction));

ReactDOM.render(

    <Provider store={ store }>
        <AppContainer />
    </Provider>,
    document.querySelector(".container")
);
