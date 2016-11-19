import React from 'react';
import TfL from './tfl.jsx';


const Arrivals = ({ train, dlr, bus, direction, changeDirection }) => {

    let headerText = (direction === 'home' ? 'Going home' : 'Going to work');
    let buttonText = (direction === 'home' ? 'Go to work' : 'Get home');

    let renderArrivals = (direction) => {
        if (direction === 'home') {
            return (
                <div className="arrivals-container">
                    <TfL mode="Bus" data={ bus } />
                    <TfL mode="DLR" data={ dlr } />
                </div>
            );
        }
        if (direction === 'away') {
            return (
                <div className="arrivals-container">
                    <TfL mode="DLR" data={ dlr } />
                    <TfL mode="Bus" data={ bus } />
                </div>
            );
        }
    };

    return (
        <div>
            <h2>{ headerText }</h2>
            { renderArrivals(direction) }
            <button className={ direction === 'home' ? 'home' : 'away' } onClick={ () => changeDirection() }>{ buttonText }</button>
        </div>
    );
};

export default Arrivals;
