'use strict';

import React           from 'react';
import RaisedButton    from 'material-ui/lib/raised-button';


const DirectionButtons = () => {

    return (
        <div>
            <RaisedButton label={ "Home" } />
            <RaisedButton label={ "Away" } />
        </div>
    );
};

export default DirectionButtons;
