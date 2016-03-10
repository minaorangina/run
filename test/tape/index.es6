'use strict';

import tape from 'tape';
import React                                     from 'react';
import { renderIntoDocument }                    from 'react-addons-test-utils';
import { scryRenderedDOMComponentsWithTag }      from 'react-addons-test-utils';
import { scryRenderedDOMComponentsWithClass }    from 'react-addons-test-utils';

import AppContainer        from '../../public/src/components/app-container.jsx';

tape('App Container', (t) => {

    let component = renderIntoDocument(<AppContainer />);

    const _dlr = scryRenderedDOMComponentsWithClass(component, 'dlr-container');

    t.equal(_dlr.length, 1, "DLRContainer renders correctly");
});
