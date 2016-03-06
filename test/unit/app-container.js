'use strict';

import React                                     from 'react';
import { renderIntoDocument }                    from 'react-addons-test-utils';
import { scryRenderedDOMComponentsWithTag }      from 'react-addons-test-utils';
import { scryRenderedDOMComponentsWithClass }    from 'react-addons-test-utils';

import { expect }          from 'chai';
import shallowRenderer     from '../utils/shallowRenderer.js';

import AppContainer        from '../../public/src/components/app-container.jsx';
import DirectionButtons    from '../../public/src/components/direction-buttons.jsx';


describe.only('AppContainer', function () {

    it('renders correctly', function () {

        const component = renderIntoDocument(React.createElement(AppContainer));
        const _dlr = scryRenderedDOMComponentsWithClass(component, 'dlr');
        const _bus = scryRenderedDOMComponentsWithClass(component, 'bus');
        const _train = scryRenderedDOMComponentsWithClass(component, 'train');
        const _directionButtons = shallowRenderer(DirectionButtons);

        console.log(_directionButtons);
        expect(_dlr.length).to.equal(1);
        expect(_bus.length).to.equal(1);
        expect(_train.length).to.equal(1);
        // expect(_directionButtons.length).to.equal(2);
    });
});
