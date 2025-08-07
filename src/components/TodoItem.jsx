import React, {forwardRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import {toggleTaskComplete, deleteTask, editTaskRequest} from '../redux/taskActions';

const TodoItem = forwardRef(({ task, ...props }, ref) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTaskComplete(task.id));
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    const borderColorClass = task.completed ? 'border-gray-300' : 'border-emerald-500';
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);


    const handleSave = () => {
        dispatch(editTaskRequest({ ...task, text: editText }));
        setIsEditing(false);
    };
    return (
        <div  ref={ref} {...props} className={`flex items-center p-3 my-5 bg-gray-50 rounded-lg border-l-4 transition-all ${borderColorClass}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle}
                className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mr-4 cursor-pointer"
            />
            <div className="flex-1">
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                ) : (
                    <p className={`text-base font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.text}
                    </p>
                )}
                <span className="text-xs text-white bg-gray-400 rounded-full px-2 py-0.5">
                    {task.category}
                </span>
            </div>
            {isEditing ? (
                <button onClick={handleSave} className="ml-4 px-4 py-1 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">Simpan</button>
            ) : (
                <button onClick={() => setIsEditing(true)} className="ml-4 px-4 py-1 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Edit</button>
            )}
            <button
                onClick={handleDelete}
                className="ml-2 px-2 py-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                aria-label="Hapus tugas"
            >
                &#x2715;
            </button>
        </div>
    );
});

export default TodoItem;
