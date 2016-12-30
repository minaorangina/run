import React from 'react';
import TfL from './tfl.jsx';
import Train from './train.jsx';


const Arrivals = ({ train, dlr, bus, direction, changeDirection }) => {

    const headerText = (direction === 'home' ? 'Going home' : 'Going to work');
    const buttonIcon = (direction === 'home' ? 'fa fa-briefcase' : 'fa fa-home');

    const renderArrivals = (direction) => {
        if (direction === 'home') {
            return (
                <div className="arrivals-container">
                    <TfL mode="Bus" data={ bus } direction={ direction }  />
                    <TfL mode="DLR" data={ dlr } direction={ direction }  />
                    <Train data={ train } />
                </div>
            );
        }
        if (direction === 'away') {
            return (
                <div className="arrivals-container">
                    <Train data={ train } />
                    <TfL mode="DLR" data={ dlr } direction={ direction }  />
                    <TfL mode="Bus" data={ bus } direction={ direction }  />
                </div>
            );
        }
    };

    return (
        <div>
            <h3 className="header">{ headerText }</h3>
            { renderArrivals(direction) }
            <button className={ direction === 'home' ? 'home' : 'away' } onClick={ () => changeDirection() }>
              <i aria-hidden='true' className={ buttonIcon } />
            </button>
        </div>
    );
};

export default Arrivals;
