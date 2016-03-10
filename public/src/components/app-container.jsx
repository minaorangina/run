'use strict';

import React                 from 'react';
import { ArrivalsContainer } from './arrivals.jsx';
import DirectionButtons      from './direction-buttons.jsx';


const AppContainer = React.createClass({

    render () {

        return (
            <div>
                <ArrivalsContainer />
                <DirectionButtons />
            </div>
        );
    }
});

export default AppContainer;
