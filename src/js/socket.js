import {
  getArrivalsSuccess,
  getArrivalsFailure,
  genericFailure
} from './actions';

export const socket = io(); // eslint-disable-line no-undef

export function registerListeners (dispatch) {

    socket.on('dlr:arrivals', ({ direction, data }) => {
        dispatch(getArrivalsSuccess('dlr', direction, data));
    });

    socket.on('bus:arrivals', ({ direction, data }) => {
        dispatch(getArrivalsSuccess('bus', direction, data));
    });

    socket.on('train:arrivals', ({ direction, data }) => {
        console.table(data);
        dispatch(getArrivalsSuccess('train', direction, data));
    });

    socket.on('dlr:error', (error) => {
        dispatch(getArrivalsFailure('dlr', error));
    });

    socket.on('bus:error', (error) => {
        dispatch(getArrivalsFailure('bus', error));
    });

    socket.on('train:error', (error) => {
        console.log("ERROR?", error);
        dispatch(getArrivalsFailure('train', error));
    });

    socket.on('error', (error) => {
        dispatch(genericFailure(error));
    });
}
