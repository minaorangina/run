import React from 'react';
import TfL from './tfl.jsx';


const Arrivals = ({ train, dlr, bus, direction, changeDirection }) => {

    let headerText = (direction === 'home' ? 'Going home' : 'Going to work');
    let buttonIcon = (direction === 'home' ? 'fa fa-briefcase' : 'fa fa-home');

    let renderArrivals = (direction) => {
        if (direction === 'home') {
            return (
                <div className="arrivals-container">
                    <TfL mode="Bus" data={ bus } direction={ direction }  />
                    <TfL mode="DLR" data={ dlr } direction={ direction }  />
                </div>
            );
        }
        if (direction === 'away') {
            return (
                <div className="arrivals-container">
                    <TfL mode="DLR" data={ dlr } direction={ direction }  />
                    <TfL mode="Bus" data={ bus } direction={ direction }  />
                </div>
            );
        }
    };

    return (
        <div>
            <h3>{ headerText }</h3>
            { renderArrivals(direction) }
            <button className={ direction === 'home' ? 'home' : 'away' } onClick={ () => changeDirection() }>
              <i aria-hidden='true' className={ buttonIcon } />
            </button>
        </div>
    );
};

export default Arrivals;
