import React from 'react';
import TfL from './tfl.jsx';


const Arrivals = ({ train, dlr, bus, direction, changeDirection }) => {

    let renderArrivals = (direction) => {
        if (direction === 'home') {
            return (
                <div>
                    <TfL mode="Bus" data={ bus } />
                    <TfL mode="DLR" data={ dlr } />
                </div>
            );
        }
        if (direction === 'away') {
            return (
                <div>
                    <TfL mode="DLR" data={ dlr } />
                    <TfL mode="Bus" data={ bus } />
                </div>
            );
        }
    };

    return (
        <div>
            { renderArrivals(direction) }
            <button onClick={ () => changeDirection() }>Change direction</button>
        </div>
    );
};

export default Arrivals;
