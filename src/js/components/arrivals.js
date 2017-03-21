import React, { PropTypes } from 'react';
import TfL from './tfl.js';
import Train from './train.js';


const Arrivals = ({ train, dlr, bus, direction, changeDirection }) => {

    const headerText = (direction === 'home' ? 'Going home' : 'Going to work');
    const buttonIcon = (direction === 'home' ? 'fa fa-briefcase' : 'fa fa-home');

    const renderArrivals = (direction) => {
        if (direction === 'home') {
            return (
                <div className="arrivals-container">
                    <TfL mode="Bus" data={ bus.arrivals } direction={ direction }  />
                    <TfL mode="DLR" data={ dlr.arrivals } direction={ direction }  />
                    <Train data={ train.arrivals } origin={ train.origin } destination={ train.destination } direction={ direction } />
                </div>
            );
        }
        if (direction === 'away') {
            return (
                <div className="arrivals-container">
                    <Train data={ train.arrivals } origin={ train.origin } destination={ train.destination } />
                    <TfL mode="DLR" data={ dlr.arrivals } direction={ direction }  />
                    <TfL mode="Bus" data={ bus.arrivals } direction={ direction }  />
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

Arrivals.propTypes = {
    train: PropTypes.object,
    dlr: PropTypes.object,
    bus: PropTypes.object,
    changeDirection: PropTypes.func,
    direction: PropTypes.string
};
