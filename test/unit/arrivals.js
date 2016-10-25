'use strict';

import React                                     from 'react';
import { renderIntoDocument }                    from 'react-addons-test-utils';
import { scryRenderedDOMComponentsWithTag }      from 'react-addons-test-utils';
import { scryRenderedDOMComponentsWithClass }    from 'react-addons-test-utils';

import { expect }          from 'chai';
import shallowRenderer     from '../utils/shallowRenderer.js';

import AppContainer        from '../../public/src/components/app-container.jsx';
import DirectionButtons    from '../../public/src/components/direction-buttons.jsx';


describe('AppContainer', function () {

    let component;

    beforeEach( () => {

        component = renderIntoDocument(<AppContainer />);
    });


    it('renders `DLRContainer` correctly', function () {

        const _dlr = scryRenderedDOMComponentsWithClass(component, 'dlr-container');

        expect(_dlr.length).to.equal(1);
    });

    it('renders `BusArrivals` correctly', function () {

        const _bus = scryRenderedDOMComponentsWithClass(component, 'bus-arrivals');

        expect(_bus.length).to.equal(1);
    });

    it('renders `TrainArrivals` correctly', function () {

        const _train = scryRenderedDOMComponentsWithClass(component, 'train-arrivals');

        expect(_train.length).to.equal(1);
    });

});
