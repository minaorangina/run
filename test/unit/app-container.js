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

    it('renders `ArrivalsContainer` correctly', function () {

        const _ArrivalsContainer = scryRenderedDOMComponentsWithClass(component, 'arrivals-container');

        expect(_ArrivalsContainer.length).to.equal(1);
    });

    it('renders DirectionButtons correctly', function () {

        const _directionButtons = shallowRenderer(<DirectionButtons />);

        expect(_directionButtons.props.children.length).to.equal(2);
    });
});
