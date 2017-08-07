import React, { PropTypes } from 'react';
import TfL from './tfl.js';
import Train from './train.js';


const Arrivals = ({ train, dlr, bus, direction, changeDirection }) => {

    const headerText = (direction === 'home' ? 'Going home' : 'Going to work');

    const renderArrivals = (direction) => {
        if (direction === 'home') {
            return (
                <div className="arrivals-container">
                    <TfL
                        mode="Bus"
                        data={ bus.arrivals }
                        direction={ direction }
                        last_updated={ bus.last_updated }
                    />
                    <TfL
                        mode="DLR"
                        data={ dlr.arrivals }
                        direction={ direction }
                        last_updated={ dlr.last_updated }
                    />
                    <Train
                        data={ train.arrivals }
                        origin={ train.origin }
                        destination={ train.destination }
                        direction={ direction }
                        last_updated={ train.last_updated }
                    />
                </div>
            );
        }
        if (direction === 'away') {
            return (
                <div className="arrivals-container">
                    <Train
                        data={ train.arrivals }
                        origin={ train.origin }
                        destination={ train.destination }
                        last_updated={ train.last_updated }
                    />
                    <TfL
                        mode="DLR"
                        data={ dlr.arrivals }
                        direction={ direction }
                        last_updated={ dlr.last_updated }
                    />
                    <TfL
                        mode="Bus"
                        data={ bus.arrivals }
                        direction={ direction }
                        last_updated={ bus.last_updated }
                    />
                </div>
            );
        }
    };
    return (
        <div>
            <h3 className="header">
            <i className={ direction === 'home' ? 'ion-android-home' : 'ion-briefcase' } />
                { headerText }
            </h3>
            { renderArrivals(direction) }
            <button
                className={ direction === 'home' ? 'home' : 'away' }
                onClick={ () => changeDirection() }
            >
              <i aria-hidden='true' className="ion-arrow-swap"/>
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
