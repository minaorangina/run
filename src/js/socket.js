import {
  getArrivalsSuccess,
  getArrivalsFailure,
  genericFailure
} from './actions';

export const socket = io(); // eslint-disable-line no-undef

export function registerListeners (dispatch) {

    socket.on('dlr:arrivals', (payload) => {
        dispatch(getArrivalsSuccess('dlr', payload));
    });

    socket.on('bus:arrivals', (payload) => {
        dispatch(getArrivalsSuccess('bus', payload));
    });

    socket.on('train:arrivals', (payload) => {
        dispatch(getArrivalsSuccess('train', payload));
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
