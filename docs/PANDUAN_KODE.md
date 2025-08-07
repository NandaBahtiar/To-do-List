# Panduan Penulisan Kode & Konvensi

Dokumen ini memberikan panduan teknis dan konvensi yang digunakan dalam proyek ini, dengan fokus pada implementasi React, Redux, dan Redux Saga.

## Daftar Isi

1.  [Prinsip Umum](#prinsip-umum)
2.  [React & Komponen](#react--komponen)
3.  [Redux & Manajemen State](#redux--manajemen-state)
4.  [Redux Saga: Panduan Mendalam](#redux-saga-panduan-mendalam)
5.  [Fungsi dan Kegunaan File di `src/redux/`](#fungsi-dan-kegunaan-file-di-srcredux)
6.  [Langkah-Langkah Membuat Fitur Redux Baru](#langkah-langkah-membuat-fitur-redux-baru)
7.  [Panduan: Menambahkan Fitur Edit Tugas](#panduan-menambahkan-fitur-edit-tugas)
8.  [Panduan: Fetching Data Cuaca (Contoh API Call)](#panduan-fetching-data-cuaca-contoh-api-call)
9.  [Contoh Praktis](#contoh-praktis)

---

## Prinsip Umum

-   **Single Responsibility Principle (SRP)**: Setiap file atau fungsi harus memiliki satu tanggung jawab utama.
-   **Don't Repeat Yourself (DRY)**: Hindari duplikasi kode.
-   **Immutability**: State tidak boleh diubah secara langsung.

---

## React & Komponen

-   Gunakan **Functional Components** dengan **Arrow Functions**.
-   Manfaatkan **React Hooks** (`useState`, `useEffect`, `useDispatch`, `useSelector`).
-   Gunakan kelas-kelas utilitas dari **Tailwind CSS** untuk styling.

---

## Redux & Manajemen State

-   Struktur direktori Redux dipusatkan di `src/redux/`.
-   Gunakan **Action Types** sebagai konstanta dan **Action Creators** untuk membuat aksi.
-   **Reducer** harus berupa fungsi murni dan menjaga immutability.

---

## Redux Saga: Panduan Mendalam

-   Gunakan Saga untuk mengelola **side effects** (operasi asinkron).
-   Gunakan pola **Request -> Success/Failure** untuk alur kerja asinkron.

---

## Fungsi dan Kegunaan File di `src/redux/`

-   **`actionTypes.js`**: Mendefinisikan semua tipe aksi.
-   **`...Actions.js`**: Berisi *action creators* untuk sebuah fitur.
-   **`...Reducer.js`**: Mengelola state untuk sebuah fitur.
-   **`...Saga.js`**: Menangani logika asinkron untuk sebuah fitur.
-   **`rootSaga.js`**: Menggabungkan semua saga.
-   **`store.js`**: Mengkonfigurasi dan membuat Redux store.

---

## Langkah-Langkah Membuat Fitur Redux Baru

1.  **Definisikan Action Types** (`actionTypes.js`).
2.  **Buat Action Creators** (`...Actions.js`).
3.  **Buat Reducer** (`...Reducer.js`).
4.  **Integrasikan Reducer** ke `store.js`.
5.  **Buat Saga** (`...Saga.js`) untuk logika asinkron.
6.  **Integrasikan Saga** ke `rootSaga.js`.
7.  **Hubungkan ke UI** menggunakan `useDispatch` dan `useSelector`.

---

## Panduan: Menambahkan Fitur Edit Tugas

(Panduan ini menjelaskan cara menambahkan fitur edit dari A-Z, mulai dari action hingga UI.)

---

## Panduan: Fetching Data Cuaca (Contoh API Call)

Berikut adalah langkah-langkah rinci untuk menambahkan fitur baru yang mengambil data dari API.

### Langkah 1: Buat Lapisan API

Buat file baru `src/api/weatherAPI.js`.

```javascript
// src/api/weatherAPI.js
import axios from 'axios';

const WEATHER_API_URL = 'https://wttr.in/Jakarta?format=j1';

export const fetchWeatherAPI = () => {
    return axios.get(WEATHER_API_URL);
};
```

### Langkah 2: Definisikan Action Types

Buka `src/redux/actionTypes.js` dan tambahkan:

```javascript
// Weather Actions
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
```

### Langkah 3: Buat Action Creators

Buat file baru `src/redux/weatherActions.js`.

```javascript
// src/redux/weatherActions.js
import * as actionTypes from './actionTypes';

export const fetchWeatherRequest = () => ({ type: actionTypes.FETCH_WEATHER_REQUEST });
export const fetchWeatherSuccess = (data) => ({ type: actionTypes.FETCH_WEATHER_SUCCESS, payload: data });
export const fetchWeatherFailure = (error) => ({ type: actionTypes.FETCH_WEATHER_FAILURE, payload: error });
```

### Langkah 4: Buat Reducer Cuaca

Buat file baru `src/redux/weatherReducer.js`.

```javascript
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
```

### Langkah 5: Buat Saga Cuaca

Buat file baru `src/redux/weatherSaga.js`.

```javascript
// src/redux/weatherSaga.js
import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import { fetchWeatherSuccess, fetchWeatherFailure } from './weatherActions';
import { fetchWeatherAPI } from '../api/weatherAPI';

function* fetchWeatherSaga() {
    try {
        const response = yield call(fetchWeatherAPI);
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
```

### Langkah 6: Integrasikan ke Store & Root Saga

1.  **Update `src/redux/store.js`**:
    ```javascript
    // ... imports
    import weatherReducer from "./weatherReducer.js"; // <-- Impor

    const rootReducer = combineReducers({
        tasks: taskReducer,
        filters: filterReducer,
        weather: weatherReducer, // <-- Tambahkan
    });
    // ...
    ```

2.  **Update `src/redux/rootSaga.js`**:
    ```javascript
    // ... imports
    import weatherSaga from './weatherSaga'; // <-- Impor

    export default function* rootSaga() {
        yield all([
            taskSaga(),
            weatherSaga(), // <-- Tambahkan
        ]);
    }
    ```

### Langkah 7: Buat Komponen UI & Picu Fetch

1.  **Buat file `src/components/WeatherDisplay.jsx`**. Komponen ini bertanggung jawab untuk memicu fetch datanya sendiri dan menampilkannya.
    ```javascript
    import React, { useEffect } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { fetchWeatherRequest } from '../redux/weatherActions';

    const WeatherDisplay = () => {
        const dispatch = useDispatch();
        const { data, loading, error } = useSelector(state => state.weather);

        useEffect(() => {
            dispatch(fetchWeatherRequest());
        }, [dispatch]);

        if (loading) return <p>Memuat data cuaca...</p>;
        if (error) return <p>Gagal memuat data cuaca.</p>;
        if (!data) return null;

        const current = data.current_condition[0];
        return (
            <div className="p-4 mb-6 bg-blue-50 rounded-lg text-center">
                <h3>Cuaca di {data.nearest_area[0].areaName[0].value}</h3>
                <p>{current.weatherDesc[0].value}, {current.temp_C}°C</p>
            </div>
        );
    };

    export default WeatherDisplay;
    ```

2.  **Update `src/App.jsx`** untuk menampilkan komponen tersebut:
    ```javascript
    // ... imports
    import WeatherDisplay from './components/WeatherDisplay';

    function App() {
        return (
            <div className="...">
                <header>...</header>
                <WeatherDisplay /> {/* <-- Cukup tambahkan komponen */}
                <main>...</main>
            </div>
        );
    }
    ```

---

## Contoh Praktis

Alur `addTaskSaga` adalah contoh implementasi dari langkah-langkah di atas.

```javascript
// taskSaga.js
function* addTaskSaga(action) { /* ... */ }
function* watchAddTask() { /* ... */ }
```

Dokumen ini membantu menjaga konsistensi dan kualitas kode di seluruh proyek.
