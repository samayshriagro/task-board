import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTaskStore, STAGE_LABELS } from '../store/taskStoreSupabase';
import DraggableTaskCard from './DraggableTaskCard';

const TaskColumn = ({ stage, onEditTask }) => {
  const { getTasksByStage, getTaskCounts } = useTaskStore();
  const tasks = getTasksByStage(stage);
  const taskCounts = getTaskCounts();

  const { isOver, setNodeRef } = useDroppable({
    id: stage,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : undefined,
    borderColor: isOver ? 'rgb(59, 130, 246)' : undefined,
  };

  return (
    <div className="task-column lg:w-80" style={style} ref={setNodeRef}>
      {/* Column Header - Hidden on mobile since tabs show the title */}
      <div className="hidden lg:flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
          {STAGE_LABELS[stage]}
        </h2>
        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
          {taskCounts[stage] || 0}
        </span>
      </div>

      {/* Mobile Header - Only show stage name */}
      <div className="lg:hidden mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
          {STAGE_LABELS[stage]}
        </h2>
      </div>

      {/* Task List */}
      <div className="space-y-2 min-h-[400px] lg:min-h-[500px]">
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <DraggableTaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
        </SortableContext>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No tasks in {STAGE_LABELS[stage].toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;