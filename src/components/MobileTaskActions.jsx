import React, { useState } from 'react';
import { MoreVertical, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { useTaskStore, TASK_STAGES, STAGE_LABELS } from '../store/taskStoreSupabase';

const MobileTaskActions = ({ task, onEdit }) => {
  const [showActions, setShowActions] = useState(false);
  const { moveTask, deleteTask } = useTaskStore();

  const availableStages = Object.values(TASK_STAGES).filter(stage => stage !== task.stage);

  const handleMoveTask = (newStage) => {
    moveTask(task.id, newStage);
    setShowActions(false);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
    setShowActions(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
    setShowActions(false);
  };

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => setShowActions(!showActions)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Task actions"
      >
        <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
      </button>

      {showActions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowActions(false)}
          />
          
          {/* Actions Menu */}
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 min-w-48">
            {/* Edit and Delete Actions */}
            <button
              onClick={handleEdit}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <Edit size={14} />
              Edit Task
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400"
            >
              <Trash2 size={14} />
              Delete Task
            </button>
            
            {/* Move Actions */}
            {availableStages.length > 0 && (
              <>
                <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-2">
                  Move to
                </div>
                {availableStages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => handleMoveTask(stage)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <ArrowRight size={14} />
                    {STAGE_LABELS[stage]}
                  </button>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileTaskActions;