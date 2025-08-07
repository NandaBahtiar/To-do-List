import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter'; // Impor komponen filter

const TodoList = () => {
    const { tasks } = useSelector(state => state.tasks);
    const filters = useSelector(state => state.filters);

    const filteredTasks = tasks.filter(task => {
        const statusMatch = filters.status === 'all' || (filters.status === 'completed' ? task.completed : !task.completed);
        const categoryMatch = filters.category === 'all' || task.category === filters.category;
        const keywordMatch = task.text.toLowerCase().includes(filters.keyword.toLowerCase());

        return statusMatch && categoryMatch && keywordMatch;
    });

    return (
        <div>
            <TodoFilter />
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Daftar Tugas</h2>
            {filteredTasks.length > 0 ? (
                <div className="space-y-3">
                    {filteredTasks.map(task => (
                        <TodoItem key={task.id} task={task} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-4">Tidak ada tugas yang cocok dengan filter Anda. 🎉</p>
            )}
        </div>
    );
};

export default TodoList;