import { connect } from 'react-redux';
import { store } from '../store';
import { getArrivals } from '../actions';
import Arrivals from '../components/arrivals.jsx';
import { setBackgroundColour } from '../helpers';


const mapStateToProps = ({ bus, dlr, train, direction }) => {
    setBackgroundColour(direction);
    return {
        bus,
        train,
        dlr,
        direction
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDirection: () => {

            const newDirection = store.getState().direction === 'home' ? 'away' : 'home';
            dispatch(getArrivals('dlr', newDirection));
            dispatch(getArrivals('bus', newDirection));
            dispatch(getArrivals('train', newDirection));
        }
    };
};

const ArrivalsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Arrivals);

export default ArrivalsContainer;
