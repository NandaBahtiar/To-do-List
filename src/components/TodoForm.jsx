import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Pastikan Anda mengimpor action creator yang benar untuk Saga
import { addTaskRequest } from '../redux/taskActions';

const TodoForm = () => {
    // State lokal untuk mengelola input dari pengguna
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Personal');

    // Hook untuk mengirim aksi ke Redux
    const dispatch = useDispatch();

    // Fungsi yang dijalankan saat form di-submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const newTask = {
            id: Date.now(),
            text,
            category,
            completed: false,
        };

        // Pastikan baris ini yang Anda gunakan
        dispatch(addTaskRequest(newTask));

        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap sm:flex-nowrap items-center gap-3 mb-6">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tambah tugas baru..."
                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
            </select>
            <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
                Tambah
            </button>
        </form>
    );
};

export default TodoForm;