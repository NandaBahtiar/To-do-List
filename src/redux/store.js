import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import taskReducer from "./taskReducer.js";
import filterReducer from "./filterReducer.js";

import rootSaga from "./rootSaga.js";
import weatherReducer from "./weatherReducer.js";

const rootReducer = combineReducers({
    tasks: taskReducer,
    filters: filterReducer,
    weather: weatherReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
