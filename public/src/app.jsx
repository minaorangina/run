'use strict';

import React              from 'react';
import ReactDOM           from 'react-dom';
import { createStore }    from 'redux';
import { Provider }       from 'react-redux';
import reducer            from './state/reducer.js';
import AppContainer       from './components/app-container.jsx';

require('./scss/main.scss');

const store = createStore(reducer);

ReactDOM.render(

    <Provider store={ store }>        
        <AppContainer />
    </Provider>,
    document.getElementsByClassName("container")[0]
);
