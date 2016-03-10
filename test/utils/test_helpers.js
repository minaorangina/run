'use strict';

import jsdom from 'jsdom';
import chai from 'chai';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

function doNothing () {
    return null;
}

// require('ignore-styles');

require.extensions['.scss'] = doNothing;


global.document = doc;
global.window = win;


Object.keys(window).forEach( (key) => {

    if (!(key in global)) {

        global[key] = window[key];
    }
});
