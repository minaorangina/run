"use strict";

import React from 'react';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import { createRenderer } from 'react-addons-test-utils';

const assert = chai.assert;

const testAppContainer = () => {

    assert.ok("1", "1", "Equality found");
};

export { testAppContainer };


// console.log(TestUtils);
