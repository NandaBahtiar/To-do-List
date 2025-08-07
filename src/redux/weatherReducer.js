// src/redux/weatherReducer.js
import * as actionTypes from './actionTypes';

const initialState = { data: null, loading: false, error: null };

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WEATHER_REQUEST:
            return { ...state, loading: true, error: null };
        case actionTypes.FETCH_WEATHER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case actionTypes.FETCH_WEATHER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default weatherReducer;