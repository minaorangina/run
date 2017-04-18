'use strict';

import React                                     from 'react';
import { renderIntoDocument }                    from 'react-addons-test-utils';
import { scryRenderedDOMComponentsWithClass }    from 'react-addons-test-utils';

import { expect }          from 'chai';
import AppContainer        from '../../src/js/containers/app.jsx';


describe('AppContainer', function () {

    let component;

    beforeEach( () => {

        component = renderIntoDocument(<AppContainer />);
    });

    it('renders `ArrivalsContainer` correctly', function () {

        const _ArrivalsContainer = scryRenderedDOMComponentsWithClass(component, 'arrivals-container');

        expect(_ArrivalsContainer.length).to.equal(1);
    });
});
