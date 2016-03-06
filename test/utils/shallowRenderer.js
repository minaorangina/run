'use strict';

import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

export default function shallowRenderer (componentClass) {

    let instantiatedComponent = React.createElement(componentClass);
    return createRenderer().render(instantiatedComponent);
}
