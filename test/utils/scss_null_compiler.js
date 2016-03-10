'use strict';

function doNothing () {
    return null;
}

require.extensions['.scss'] = doNothing;
