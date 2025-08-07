import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter, setCategoryFilter, setKeywordFilter } from '../redux/filterReducer';

const TodoFilter = () => {
    const dispatch = useDispatch();
    const { status, category, keyword } = useSelector(state => state.filters);

    const handleStatusChange = (e) => {
        dispatch(setStatusFilter(e.target.value));
    };

    const handleCategoryChange = (e) => {
        dispatch(setCategoryFilter(e.target.value));
    };

    const handleKeywordChange = (e) => {
        dispatch(setKeywordFilter(e.target.value));
    };

    return (
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="w-full sm:w-1/3">
                <label htmlFor="keyword-filter" className="block text-sm font-medium text-gray-700 mb-1">Cari Tugas</label>
                <input
                    id="keyword-filter"
                    type="text"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="Ketik untuk mencari..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>
            <div className="w-full sm:w-1/3">
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter Status</label>
                <select
                    id="status-filter"
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                >
                    <option value="all">Semua</option>
                    <option value="completed">Selesai</option>
                    <option value="incomplete">Belum Selesai</option>
                </select>
            </div>
            <div className="w-full sm:w-1/3">
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter Kategori</label>
                <select
                    id="category-filter"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                >
                    <option value="all">Semua</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>
        </div>
    );
};

export default TodoFilter;