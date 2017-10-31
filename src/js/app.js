import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux';
import { store }          from './store.js';
import { getArrivals }    from './actions.js';
import ArrivalsContainer       from './containers/arrivals.js';

require('../styles.css');

const { direction } = store.getState();
store.dispatch(getArrivals('train', direction));
store.dispatch(getArrivals('dlr', direction));

ReactDOM.render(

    <Provider store={ store }>
        <ArrivalsContainer />
    </Provider>,
    document.querySelector(".container")
);
