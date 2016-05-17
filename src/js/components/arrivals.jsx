import React from 'react';
import TfL from './tfl.jsx';


const Arrivals = ({ train, dlr, bus }) => {

    return (
        <div>
            <TfL mode="Bus" data={ bus } />
            <TfL mode="DLR" data={ dlr } />
        </div>
    );
};

export default Arrivals;
