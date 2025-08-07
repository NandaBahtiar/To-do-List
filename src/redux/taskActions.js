import * as actionTypes from './actionTypes';

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
export const reorderTasks = (tasks) => ({
    type: actionTypes.REORDER_TASKS,
    payload: tasks,
});

export const toggleTaskComplete = (taskId) => ({
    type: actionTypes.TOGGLE_TASK_COMPLETE,
    payload: taskId,
});

export const editTaskRequest = (task) => ({ type: actionTypes.EDIT_TASK_REQUEST, payload: task });
export const editTaskSuccess = (task) => ({ type: actionTypes.EDIT_TASK_SUCCESS, payload: task });
export const editTaskFailure = (error) => ({ type: actionTypes.EDIT_TASK_FAILURE, payload: error });

export const deleteTask = (taskId) => ({
    type: actionTypes.DELETE_TASK,
    payload: taskId,
});
