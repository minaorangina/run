import {
  getArrivalsSuccess,
  getArrivalsFailure,
  genericFailure
} from './actions';

export const socket = io(); // eslint-disable-line no-undef

export function registerListeners (dispatch) {

    socket.on('dlr:arrivals', (data) => {
        dispatch(getArrivalsSuccess('dlr', data));
    });

    socket.on('bus:arrivals', (data) => {
        dispatch(getArrivalsSuccess('bus', data));
    });

    socket.on('train:arrivals', (data) => {
        dispatch(getArrivalsSuccess('train', data));
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
