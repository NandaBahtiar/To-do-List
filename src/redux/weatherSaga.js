// src/redux/weatherSaga.js
import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import { fetchWeatherSuccess, fetchWeatherFailure } from './weatherActions';
import { fetchWeatherAPI } from '../api/weatherAPI';

function* fetchWeatherSaga(action) {
    try {
        // Teruskan payload (lokasi) dari aksi ke pemanggilan API
        const response = yield call(fetchWeatherAPI, action.payload);
        yield put(fetchWeatherSuccess(response.data));
    } catch (error) {
        yield put(fetchWeatherFailure(error.message));
    }
}

function* watchFetchWeather() {
    yield takeLatest(actionTypes.FETCH_WEATHER_REQUEST, fetchWeatherSaga);
}

export default function* weatherSaga() {
    yield all([ watchFetchWeather() ]);
}