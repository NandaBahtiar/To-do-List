import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Impor SEMUA reducer
import taskReducer from "./taskReducer.js";
import filterReducer from "./filterReducer.js";
// import weatherReducer from "./weatherReducer.js";

// Impor rootSaga yang sudah digabung
import rootSaga from "./rootSaga.js";

// Gabungkan SEMUA reducer
const rootReducer = combineReducers({
    tasks: taskReducer,
    filters: filterReducer,
    // weather: weatherReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Jalankan saga yang sudah digabung
sagaMiddleware.run(rootSaga);

export default store;