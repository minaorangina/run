'use strict';

import React                    from 'react';
import BusArrivals              from './bus-arrivals.jsx';
import { DLRArrivalsContainer } from './dlr-arrivals.jsx';
import TrainArrivals            from './train-arrivals.jsx';
import DirectionButtons         from './direction-buttons.jsx';


const AppContainer = React.createClass({

    render () {

        return (
            <div>

                <DLRArrivalsContainer  />

                <DirectionButtons />
            </div>
        );
    }
});

export default AppContainer;
