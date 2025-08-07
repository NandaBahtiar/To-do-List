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
9.  [Panduan: Implementasi Drag-and-Drop](#panduan-implementasi-drag-and-drop)
10. [Contoh Praktis](#contoh-praktis)

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

(Panduan ini menjelaskan cara menambahkan fitur baru yang mengambil data dari API.)

---

## Panduan: Implementasi Drag-and-Drop

Berikut adalah langkah-langkah rinci untuk menambahkan fungsionalitas seret dan lepas (*drag-and-drop*) ke daftar tugas menggunakan `@hello-pangea/dnd`.

### Langkah 1: Persiapan Redux (Actions & Reducer)

1.  **Definisikan Action Type Baru**
    -   **Tujuan**: Membuat "perintah" baru untuk mengubah urutan tugas.
    -   **File**: `src/redux/actionTypes.js`
    -   **Kode**:
        ```javascript
        export const REORDER_TASKS = 'REORDER_TASKS';
        ```

2.  **Buat Action Creator**
    -   **Tujuan**: Membuat fungsi "pabrik" untuk perintah di atas.
    -   **File**: `src/redux/taskActions.js`
    -   **Kode**:
        ```javascript
        export const reorderTasks = (tasks) => ({
            type: actionTypes.REORDER_TASKS,
            payload: tasks,
        });
        ```

3.  **Update Reducer**
    -   **Tujuan**: Mengajari `taskReducer` cara menangani perintah `REORDER_TASKS`.
    -   **File**: `src/redux/taskReducer.js`
    -   **Kode** (di dalam `switch`):
        ```javascript
        case actionTypes.REORDER_TASKS:
            return {
                ...state,
                tasks: action.payload, // Ganti array lama dengan yang baru
            };
        ```

### Langkah 2: Persiapan Komponen Item (`TodoItem.jsx`)

-   **Tujuan**: Memungkinkan komponen `TodoItem` untuk "dipegang" oleh pustaka DnD.
-   **File**: `src/components/TodoItem.jsx`
-   **Apa yang harus dilakukan**: Bungkus definisi komponen dengan `React.forwardRef` dan teruskan `ref` serta `props` lainnya ke elemen pembungkus utama.
    ```javascript
    import React, { useState, forwardRef } from 'react';
    // ... import lainnya

    const TodoItem = forwardRef(({ task, ...props }, ref) => {
        // ... logika internal komponen ...

        return (
            <div ref={ref} {...props} className={`...`}>
                {/* ... JSX internal ... */}
            </div>
        );
    });

    export default TodoItem;
    ```

### Langkah 3: Implementasi Inti di `TodoList.jsx`

1.  **Impor Pustaka dan Hook**
    -   **File**: `src/components/TodoList.jsx`
    -   **Kode**:
        ```javascript
        import { useDispatch } from 'react-redux';
        import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
        import { reorderTasks } from '../redux/taskActions';
        ```

2.  **Buat Fungsi `handleOnDragEnd`**
    -   **Tujuan**: Menangani logika setelah pengguna selesai menyeret.
    -   **File**: `src/components/TodoList.jsx` (di dalam komponen)
    -   **Kode**:
        ```javascript
        const dispatch = useDispatch();

        const handleOnDragEnd = (result) => {
            if (!result.destination) return;

            const items = Array.from(filteredTasks);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            dispatch(reorderTasks(items));
        };
        ```

3.  **Bungkus JSX dengan Komponen DnD**
    -   **Tujuan**: Mengaktifkan area DnD dan item yang dapat diseret.
    -   **File**: `src/components/TodoList.jsx`
    -   **Struktur JSX**:
        ```jsx
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks-list">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {filteredTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                {(provided) => (
                                    <TodoItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        task={task}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        ```

---

## Contoh Praktis

## Contoh Praktis

Alur `addTaskSaga` adalah contoh implementasi dari langkah-langkah di atas.

```javascript
// taskSaga.js
function* addTaskSaga(action) { /* ... */ }
function* watchAddTask() { /* ... */ }
```

Dokumen ini membantu menjaga konsistensi dan kualitas kode di seluruh proyek.
