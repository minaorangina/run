'use strict';

import React     from 'react';
import { store } from '../app.jsx';
import moment    from 'moment';
import { Sorry } from './sorry.jsx';

const DLR = React.createClass({

    render () {

        let props = this.props;
        console.log("getDLRState", store.getState());
        console.log("PROPS:", props.arrivals);

        return (
            <div className='dlr'>
                <h3>West Ham</h3>
                {
                    props.arrivals === undefined ?

                        <Sorry />
                    :
                    <ul>
                        {
                            props.arrivals.dlr.map(function (arrival, i) {

                                var time = moment.duration(arrival.timeToStation, 'seconds').humanize(true);

                                return <div key={ i }><img src="static/img/dlr.jpg" width="20px"></img>{ arrival.lineName } to { arrival.destinationName } -> { time }</div>
                            })
                        }
                    </ul>
                }
            </div>
        );
    }
});

export default DLR;
