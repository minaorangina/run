import { connect } from 'react-redux';
import { store } from '../store';
import { getArrivals } from '../actions';
import Arrivals from '../components/arrivals.jsx';
import { setBackgroundColour } from '../helpers';


const mapStateToProps = (state) => {

    setBackgroundColour(state.direction);
    return {
        bus: state.bus.arrivals,
        train: state.train.arrivals,
        dlr: state.dlr.arrivals,
        direction: state.direction
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDirection: () => {

            const newDirection = store.getState().direction === 'home' ? 'away' : 'home';
            dispatch(getArrivals('dlr', newDirection));
            dispatch(getArrivals('bus', newDirection));
        }
    };
};

const ArrivalsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Arrivals);

export default ArrivalsContainer;
