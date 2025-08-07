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
8.  [Panduan: Fetching Data dengan Axios & Saga](#panduan-fetching-data-dengan-axios--saga)
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
-   **`taskActions.js`**: Berisi *action creators* untuk fitur tugas.
-   **`taskReducer.js`**: Mengelola state untuk fitur tugas.
-   **`taskSaga.js`**: Menangani logika asinkron untuk fitur tugas.
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

## Panduan: Fetching Data dengan Axios & Saga

Berikut adalah langkah-langkah untuk mengambil data dari API saat aplikasi dimuat.

### Langkah 1: Buat Lapisan API

Buat file `src/api/tasksAPI.js` untuk mengisolasi logika `axios`.

```javascript
// src/api/tasksAPI.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasksAPI = () => axios.get(`${API_URL}?_limit=5`);
```

### Langkah 2: Definisikan Action Types

Di `src/redux/actionTypes.js`, tambahkan:

```javascript
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
```

### Langkah 3: Buat Action Creators

Di `src/redux/taskActions.js`, tambahkan:

```javascript
export const fetchTasksRequest = () => ({ type: actionTypes.FETCH_TASKS_REQUEST });
export const fetchTasksSuccess = (tasks) => ({ type: actionTypes.FETCH_TASKS_SUCCESS, payload: tasks });
export const fetchTasksFailure = (error) => ({ type: actionTypes.FETCH_TASKS_FAILURE, payload: error });
```

### Langkah 4: Update Task Reducer

Di `src/redux/taskReducer.js`:

1.  Kosongkan array `tasks` di `initialState`.
2.  Tambahkan `case` untuk menangani siklus fetch.

```javascript
// Di dalam switch statement
case actionTypes.FETCH_TASKS_REQUEST:
    return { ...state, loading: true, error: null };
case actionTypes.FETCH_TASKS_SUCCESS:
    return { ...state, loading: false, tasks: action.payload };
case actionTypes.FETCH_TASKS_FAILURE:
    return { ...state, loading: false, error: action.payload };
```

### Langkah 5: Buat Logika Saga

Di `src/redux/taskSaga.js`:

1.  Impor `call` dan `fetchTasksAPI`.
2.  Buat worker dan watcher saga baru.
    ```javascript
    function* fetchTasksSaga() {
        try {
            const response = yield call(fetchTasksAPI);
            yield put(fetchTasksSuccess(response.data));
        } catch (error) {
            yield put(fetchTasksFailure(error.message));
        }
    }

    export function* watchFetchTasks() {
        yield takeLatest(actionTypes.FETCH_TASKS_REQUEST, fetchTasksSaga);
    }
    ```
3.  Daftarkan `watchFetchTasks` di `taskSaga`.

### Langkah 6: Picu Fetch dari UI

Di `src/App.jsx`, gunakan `useEffect` untuk men-dispatch aksi saat komponen dimuat.

```javascript
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasksRequest } from './redux/taskActions';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksRequest());
    }, [dispatch]);

    // ... JSX
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
