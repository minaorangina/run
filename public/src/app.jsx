'use strict';

import React           from 'react';
import ReactDOM        from 'react-dom';
import AppContainer    from './components/app-container.jsx';

require('./scss/main.scss');


ReactDOM.render(

    <AppContainer />,
    document.getElementsByClassName("container")[0]
);
