'use strict';

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const Landing = React.createClass({

    render () {

        return (
            <div>
                <RaisedButton label={ "Home" } />
                <RaisedButton label={ "Away" } />
            </div>
        );
    }
});

export default Landing
