import React              from 'react';
import ReactDOM           from 'react-dom';
import { AppContainer }   from 'react-hot-loader';
import { Provider }       from 'react-redux';
import { store }          from './store.js';
import { getArrivals }    from './actions.js';
import ArrivalsContainer  from './containers/arrivals.js';

require('../styles.css');

const { direction } = store.getState();
store.dispatch(getArrivals('train', direction));
store.dispatch(getArrivals('dlr', direction));

const render = AppRoot => {

    ReactDOM.render(
        <Provider store={ store }>
            <AppContainer>
                <AppRoot />
            </AppContainer>
        </Provider>,
        document.querySelector(".container")
    );
};

render(ArrivalsContainer);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/arrivals', () => { render(ArrivalsContainer); });
}
