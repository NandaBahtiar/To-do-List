# Cara Kerja Aplikasi To-Do List

Dokumen ini menjelaskan alur kerja dan arsitektur aplikasi To-Do List yang dibangun menggunakan React, Redux, dan Redux Saga.

## Daftar Isi

1.  [Teknologi Utama](#teknologi-utama)
2.  [Struktur Proyek](#struktur-proyek)
3.  [Konsep Inti & Alur Data](#konsep-inti--alur-data)
    -   [Komponen React](#komponen-react)
    -   [Manajemen State dengan Redux](#manajemen-state-dengan-redux)
    -   [Side Effects dengan Redux Saga](#side-effects-dengan-redux-saga)
4.  [Alur Kerja Rinci (Contoh Kasus)](#alur-kerja-rinci-contoh-kasus)
    -   [Menambahkan Tugas Baru](#1-menambahkan-tugas-baru)
    -   [Menandai Tugas Selesai](#2-menandai-tugas-selesai)
    -   [Menghapus Tugas](#3-menghapus-tugas)
5.  [Cara Menjalankan Proyek](#cara-menjalankan-proyek)

---

## Teknologi Utama

-   **React:** Library JavaScript untuk membangun antarmuka pengguna (UI).
-   **Redux:** Library untuk manajemen state yang terpusat. Membantu mengelola data aplikasi secara konsisten.
-   **Redux Saga:** Middleware untuk Redux yang berguna untuk menangani *side effects* (misalnya, pemanggilan API atau operasi asinkron lainnya) secara lebih terorganisir.
-   **Tailwind CSS:** Framework CSS untuk styling cepat dan modern.
-   **Vite:** Alat build modern yang sangat cepat untuk pengembangan frontend.

---

## Struktur Proyek

Struktur file utama di dalam direktori `src/` adalah sebagai berikut:

```
src/
├── api/            # (Kosong) Rencana untuk logika pemanggilan API
├── assets/         # Aset statis seperti gambar (SVG)
├── components/     # Komponen React yang dapat digunakan kembali
│   ├── TodoForm.jsx  # Form untuk menambah tugas baru
│   ├── TodoItem.jsx  # Menampilkan satu item tugas
│   └── TodoList.jsx  # Menampilkan daftar semua tugas
├── redux/          # Semua logika Redux & Redux Saga
│   ├── actionTypes.js     # Mendefinisikan tipe-tipe aksi sebagai konstanta
│   ├── taskActions.js     # Action creators untuk tugas
│   ├── taskReducer.js     # Reducer yang mengelola state tugas
│   ├── filterReducer.js   # Reducer yang mengelola state filter
│   ├── taskSaga.js        # Saga untuk menangani logika asinkron tugas
│   ├── rootSaga.js        # Menggabungkan semua saga menjadi satu
│   └── store.js           # Konfigurasi dan pembuatan Redux store
├── App.jsx         # Komponen utama aplikasi
├── main.jsx        # Titik masuk aplikasi, merender App dan menghubungkan Redux
└── index.css       # Styling global
```

---

## Konsep Inti & Alur Data

### Komponen React

-   **`App.jsx`**: Komponen root yang menjadi layout utama. Ini merender `TodoForm` dan `TodoList`.
-   **`TodoForm.jsx`**: Berisi form `input` untuk teks tugas dan `select` untuk kategori. Ketika form di-submit, komponen ini akan mengirim (*dispatch*) sebuah aksi ke Redux untuk menambahkan tugas baru.
-   **`TodoList.jsx`**: Mengambil daftar tugas dari Redux store menggunakan hook `useSelector` dan me-render komponen `TodoItem` untuk setiap tugas.
-   **`TodoItem.jsx`**: Menampilkan detail satu tugas, termasuk tombol checkbox untuk menandai selesai dan tombol untuk menghapus. Interaksi pengguna di sini (klik checkbox atau tombol hapus) akan men-dispatch aksi yang sesuai ke Redux.

### Manajemen State dengan Redux

State aplikasi disimpan dalam satu objek besar yang disebut **store**. Store ini bersifat *read-only* dan hanya bisa diubah dengan mengirimkan **aksi (action)**.

1.  **Store (`store.js`)**:
    -   Dibuat menggunakan `createStore` dari Redux.
    -   Menggabungkan semua *reducer* (`taskReducer`, `filterReducer`) menjadi satu `rootReducer`.
    -   Menerapkan *middleware* `redux-saga` untuk menangani operasi asinkron.
    -   Mengaktifkan Redux DevTools untuk memudahkan debugging.

2.  **Aksi (Actions - `taskActions.js`, `actionTypes.js`)**:
    -   Aksi adalah objek JavaScript biasa yang menjelaskan *apa yang terjadi*. Contoh: `{ type: 'DELETE_TASK', payload: 123 }`.
    -   `actionTypes.js` menyimpan semua tipe aksi sebagai konstanta untuk menghindari kesalahan pengetikan.
    -   `taskActions.js` berisi *action creators*, yaitu fungsi yang membuat dan mengembalikan objek aksi.

3.  **Reducer (`taskReducer.js`, `filterReducer.js`)**:
    -   Reducer adalah fungsi murni yang menerima *state saat ini* dan sebuah *aksi*, lalu mengembalikan *state baru*.
    -   `taskReducer.js` bertanggung jawab untuk mengelola state yang berhubungan dengan tugas, seperti menambah, mengubah, dan menghapus tugas.
    -   `filterReducer.js` mengelola state yang berhubungan dengan filter (misalnya, menampilkan tugas yang sudah selesai saja).

### Side Effects dengan Redux Saga

Redux Saga digunakan untuk mengelola logika yang tidak murni, seperti menunggu respons dari server.

1.  **Saga (`taskSaga.js`)**:
    -   **Watcher Saga (`watchAddTask`)**: "Mendengarkan" aksi tertentu (misalnya, `ADD_TASK_REQUEST`). Ketika aksi tersebut di-dispatch, watcher akan memicu *worker saga*.
    -   **Worker Saga (`addTaskSaga`)**: Di sinilah logika asinkron dieksekusi. Dalam aplikasi ini, ia mensimulasikan pemanggilan API dengan `delay(500)`. Setelah selesai, ia akan men-dispatch aksi baru, yaitu `ADD_TASK_SUCCESS` jika berhasil atau `ADD_TASK_FAILURE` jika gagal.

2.  **Root Saga (`rootSaga.js`)**:
    -   Menggabungkan semua watcher saga dari berbagai file menjadi satu saga utama yang akan dijalankan oleh middleware.

---

## Alur Kerja Rinci (Contoh Kasus)

### 1. Menambahkan Tugas Baru

1.  **UI (`TodoForm.jsx`)**: Pengguna mengetik "Belajar Redux Saga", memilih kategori "Work", dan menekan tombol "Tambah".
2.  **Dispatch Aksi Awal**: `TodoForm` memanggil `dispatch(addTaskRequest({ id: ..., text: 'Belajar Redux Saga', ... }))`. Aksi `ADD_TASK_REQUEST` dikirim.
3.  **Saga Mendengar (`taskSaga.js`)**: `watchAddTask` mendeteksi aksi `ADD_TASK_REQUEST` dan memanggil worker `addTaskSaga`.
4.  **Saga Bekerja (`taskSaga.js`)**:
    -   `taskReducer` menangani `ADD_TASK_REQUEST` dengan mengubah `state.loading` menjadi `true`. UI bisa menampilkan indikator loading.
    -   `addTaskSaga` berjalan, mensimulasikan latensi jaringan selama 500ms dengan `yield delay(500)`.
    -   Setelah delay selesai, saga men-dispatch aksi baru: `yield put(addTaskSuccess(newTask))`.
5.  **Reducer Memperbarui State (`taskReducer.js`)**:
    -   `taskReducer` menerima aksi `ADD_TASK_SUCCESS`.
    -   Ia mengembalikan state baru di mana `loading` menjadi `false` dan tugas baru ditambahkan ke dalam array `state.tasks`.
6.  **UI Merender Ulang**:
    -   Komponen `TodoList` yang terhubung ke store mendeteksi perubahan pada `state.tasks`.
    -   React secara otomatis merender ulang `TodoList`, menampilkan tugas baru di layar.

### 2. Menandai Tugas Selesai

1.  **UI (`TodoItem.jsx`)**: Pengguna mengklik checkbox pada sebuah tugas.
2.  **Dispatch Aksi**: `TodoItem` memanggil `dispatch(toggleTaskComplete(taskId))`.
3.  **Reducer Bekerja (`taskReducer.js`)**:
    -   `taskReducer` menerima aksi `TOGGLE_TASK_COMPLETE`.
    -   Ia mencari tugas dengan `taskId` yang sesuai di dalam array `state.tasks`, lalu membuat salinan tugas tersebut dengan nilai `completed` yang dibalik (`!task.completed`).
    -   Reducer mengembalikan state baru dengan array tugas yang telah diperbarui.
4.  **UI Merender Ulang**: `TodoItem` menerima props baru dan menampilkan gaya visual yang berbeda (misalnya, teks dicoret).

### 3. Menghapus Tugas

1.  **UI (`TodoItem.jsx`)**: Pengguna mengklik tombol 'X' (hapus).
2.  **Dispatch Aksi**: `TodoItem` memanggil `dispatch(deleteTask(taskId))`.
3.  **Reducer Bekerja (`taskReducer.js`)**:
    -   `taskReducer` menerima aksi `DELETE_TASK`.
    -   Ia menggunakan metode `.filter()` untuk membuat array `tasks` baru yang tidak lagi berisi tugas dengan `taskId` yang cocok.
    -   Reducer mengembalikan state baru dengan array tugas yang lebih pendek.
4.  **UI Merender Ulang**: `TodoList` merender ulang dan tugas yang dihapus tidak lagi ditampilkan.

---

## Cara Menjalankan Proyek

1.  **Instal Dependensi**:
    Pastikan Anda memiliki Node.js terinstal. Buka terminal di direktori proyek dan jalankan:
    ```bash
    npm install
    ```

2.  **Jalankan Server Pengembangan**:
    Setelah instalasi selesai, jalankan perintah berikut untuk memulai server Vite:
    ```bash
    npm run dev
    ```

3.  Buka browser dan kunjungi `http://localhost:5173` (atau alamat lain yang ditampilkan di terminal).