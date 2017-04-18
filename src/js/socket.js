import {
  getArrivalsSuccess,
  getArrivalsFailure,
  genericFailure
} from './actions';

export const socket = io(); // eslint-disable-line no-undef

export function registerListeners (dispatch) {

    socket.on('dlr:arrivals', ({ direction, data, origin, destination }) => {
        dispatch(getArrivalsSuccess('dlr', direction, data, origin, destination));
    });

    socket.on('bus:arrivals', ({ direction, data, origin, destination }) => {
        dispatch(getArrivalsSuccess('bus', direction, data, origin, destination));
    });

    socket.on('train:arrivals', ({ direction, data, origin, destination }) => {
        dispatch(getArrivalsSuccess('train', direction, data, origin, destination));
    });

    socket.on('dlr:error', (error) => {
        dispatch(getArrivalsFailure('dlr', error));
    });

    socket.on('bus:error', (error) => {
        dispatch(getArrivalsFailure('bus', error));
    });

    socket.on('train:error', (error) => {
        dispatch(getArrivalsFailure('train', error));
    });

    socket.on('error', (error) => {
        dispatch(genericFailure(error));
    });
}
