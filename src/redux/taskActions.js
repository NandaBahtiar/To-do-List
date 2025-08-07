import * as actionTypes from './actionTypes';


// Ganti action creator addTask yang lama
export const addTaskRequest = (task) => ({
    type: actionTypes.ADD_TASK_REQUEST,
    payload: task,
});

export const addTaskSuccess = (task) => ({
    type: actionTypes.ADD_TASK_SUCCESS,
    payload: task,
});

export const addTaskFailure = (error) => ({
    type: actionTypes.ADD_TASK_FAILURE,
    payload: error,
});


// Action creator untuk mengubah status selesai
export const toggleTaskComplete = (taskId) => ({
    type: actionTypes.TOGGLE_TASK_COMPLETE,
    payload: taskId, // Kita hanya perlu ID tugas yang mau diubah
});

export const editTaskRequest = (task) => ({ type: actionTypes.EDIT_TASK_REQUEST, payload: task });
export const editTaskSuccess = (task) => ({ type: actionTypes.EDIT_TASK_SUCCESS, payload: task });
export const editTaskFailure = (error) => ({ type: actionTypes.EDIT_TASK_FAILURE, payload: error });



// Action creator untuk menghapus tugas
export const deleteTask = (taskId) => ({
    type: actionTypes.DELETE_TASK,
    payload: taskId,
});

// Ini adalah "action creator" untuk menghapus tugas.
// Ketika fungsi `deleteTask` ini dipanggil dengan `taskId` (ID dari tugas yang ingin dihapus),
// ia akan mengembalikan sebuah "action" (objek JavaScript biasa).
// Action ini memiliki properti `type` yang menunjukkan jenis aksi (`DELETE_TASK`)
// dan properti `payload` yang membawa data yang relevan untuk aksi tersebut,
// dalam hal ini adalah `taskId` dari tugas yang akan dihapus.