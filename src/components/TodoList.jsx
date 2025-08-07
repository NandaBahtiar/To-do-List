import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { reorderTasks } from '../redux/taskActions';
const TodoList = () => {
    const { tasks } = useSelector(state => state.tasks);
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const handleOnDragEnd = (result) => {
        const isFiltered = filters.status !== 'all' || filters.category !== 'all' || filters.keyword !== '';

        // Nonaktifkan reorder jika ada filter yang aktif untuk mencegah data loss
        if (!result.destination || isFiltered) return;

        const items = Array.from(tasks); // Gunakan tasks asli, bukan filteredTasks
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        dispatch(reorderTasks(items));
    };
    const filteredTasks = tasks.filter(task => {
        const statusMatch = filters.status === 'all' || (filters.status === 'completed' ? task.completed : !task.completed);
        const categoryMatch = filters.category === 'all' || task.category === filters.category;
        const keywordMatch = task.text.toLowerCase().includes(filters.keyword.toLowerCase());

        return statusMatch && categoryMatch && keywordMatch;
    });

    return (
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
    );
};

export default TodoList;
