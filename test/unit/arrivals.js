'use strict';

import React                                     from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
}                                                from 'react-addons-test-utils';

import { expect }          from 'chai';
import AppContainer        from '../../src/js/containers/app.jsx';


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
