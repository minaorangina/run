import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { store }          from './store.js';
import { getArrivals }    from './actions.js';
import ArrivalsContainer       from './containers/arrivals.js';

require('../scss/main.scss');

const { direction } = store.getState();
store.dispatch(getArrivals('train', direction));
store.dispatch(getArrivals('dlr', direction));
store.dispatch(getArrivals('bus', direction));

ReactDOM.render(

    <Provider store={ store }>
        <ArrivalsContainer />
    </Provider>,
    document.querySelector(".container")
);
