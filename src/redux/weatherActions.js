import * as actionTypes from './actionTypes';

export const fetchWeatherRequest = (location) => ({
    type: actionTypes.FETCH_WEATHER_REQUEST,
    payload: location,
});

export const fetchWeatherSuccess = (data) => ({
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    payload: data,
});

export const fetchWeatherFailure = (error) => ({
    type: actionTypes.FETCH_WEATHER_FAILURE,
    payload: error,
});
