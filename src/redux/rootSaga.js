import { all } from 'redux-saga/effects';
import taskSaga from './taskSaga';
import weatherSaga from "./weatherSaga.js";

export default function* rootSaga() {
    yield all([
        taskSaga(),
        weatherSaga()
    ]);
}