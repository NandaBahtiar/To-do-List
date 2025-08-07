import * as actionTypes from "./actionTypes.js";

const initialState = {
    tasks: [
        { id: 1, text: 'Selesaikan setup Redux', category: 'Work', completed: true },
        { id: 2, text: 'Buat komponen UI', category: 'Work', completed: false },
    ],
    loading: false,
    error: null,
};
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TASK_REQUEST:
            return { ...state, loading: true, error: null };
        case actionTypes.ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: [action.payload, ...state.tasks],
            };
        case actionTypes.ADD_TASK_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case actionTypes.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };

        case actionTypes.TOGGLE_TASK_COMPLETE:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        case actionTypes.EDIT_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id
                        ? action.payload
                        : task
                ),
            };
        case actionTypes.REORDER_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};
export default taskReducer;