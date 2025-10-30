import React, { useState } from 'react';
import { Calendar, User, MessageSquare, Edit, Trash2, Plus } from 'lucide-react';
import { useTaskStore, PRIORITY_COLORS } from '../store/taskStoreSupabase';
import { formatDate } from '../utils/dateUtils';
import MobileTaskActions from './MobileTaskActions';

const TaskCard = ({ task, isDragOver, onEdit }) => {
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  const { deleteTask, addComment } = useTaskStore();

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.name.trim() && newComment.text.trim()) {
      addComment(task.id, newComment);
      setNewComment({ name: '', text: '' });
      setShowAddComment(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(task);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={`task-card ${isDragOver ? 'ring-2 ring-primary-500' : ''} group`}>
      {/* Priority Badge and Actions */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
        </span>
        <div className="flex items-center gap-1">
          {/* Desktop Actions */}
          <div className="hidden lg:flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Edit task"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600"
              title="Delete task"
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          {/* Mobile Actions */}
          <MobileTaskActions task={task} onEdit={onEdit} />
        </div>
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Dates */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={12} />
          <span>Start: {formatDate(task.startDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={12} />
          <span>End: {formatDate(task.endDate)}</span>
        </div>
      </div>

      {/* Owner */}
      <div className="flex items-center gap-2 mb-3">
        <User size={12} className="text-gray-500 dark:text-gray-400" />
        <span className="text-xs text-gray-600 dark:text-gray-400">{task.owner}</span>
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <MessageSquare size={12} />
          <span>{task.comments?.length || 0} comments</span>
        </button>

        {showComments && (
          <div className="mt-3 space-y-2">
            {task.comments?.map((comment) => (
              <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {comment.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{comment.text}</p>
              </div>
            ))}

            {showAddComment ? (
              <form onSubmit={handleAddComment} className="space-y-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
                <textarea
                  placeholder="Add a comment..."
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                  rows="2"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddComment(false);
                      setNewComment({ name: '', text: '' });
                    }}
                    className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddComment(true)}
                className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <Plus size={12} />
                Add comment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;