// src/redux/taskSaga.js

import { takeLatest, put, all, delay } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import {addTaskSuccess, addTaskFailure, editTaskSuccess, editTaskFailure} from './taskActions';

// Worker
function* addTaskSaga(action) {
    try {
        // Simulasi proses simpan ke server
        yield delay(500);
        // Pastikan ini dipanggil setelah delay
        yield put(addTaskSuccess(action.payload));
    } catch (error) {
        yield put(addTaskFailure(error.message));
    }
}

// Watcher
export function* watchAddTask() {
    // Pastikan watcher mendengarkan aksi REQUEST
    yield takeLatest(actionTypes.ADD_TASK_REQUEST, addTaskSaga);
}

// Gabungkan semua watcher task di sini
export default function* taskSaga() {
    yield all([
        watchAddTask(),
        watchEditTask()
        // Tambahkan watcher lain jika ada
    ]);
}
function* editTaskSaga(action) {
    try {
        yield delay(500); // Simulasi API call
        yield put(editTaskSuccess(action.payload));
    } catch (error) {
        yield put(editTaskFailure(error.message));
    }
}

export function* watchEditTask() {
    yield takeLatest(actionTypes.EDIT_TASK_REQUEST, editTaskSaga);
}