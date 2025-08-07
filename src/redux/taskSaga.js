import { takeLatest, put, all, delay } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import {addTaskSuccess, addTaskFailure, editTaskSuccess, editTaskFailure} from './taskActions';

function* addTaskSaga(action) {
    try {
        yield delay(500);
        yield put(addTaskSuccess(action.payload));
    } catch (error) {
        yield put(addTaskFailure(error.message));
    }
}

export function* watchAddTask() {
    yield takeLatest(actionTypes.ADD_TASK_REQUEST, addTaskSaga);
}

export default function* taskSaga() {
    yield all([
        watchAddTask(),
        watchEditTask()
    ]);
}
function* editTaskSaga(action) {
    try {
        yield delay(500);
        yield put(editTaskSuccess(action.payload));
    } catch (error) {
        yield put(editTaskFailure(error.message));
    }
}

export function* watchEditTask() {
    yield takeLatest(actionTypes.EDIT_TASK_REQUEST, editTaskSaga);
}
