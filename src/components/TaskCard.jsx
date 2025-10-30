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
      <div className="flex items-center justify-between mb-2">
        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <div className="flex items-center gap-1">
          {/* Desktop Actions */}
          <div className="hidden lg:flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Edit task"
            >
              <Edit size={12} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600"
              title="Delete task"
            >
              <Trash2 size={12} />
            </button>
          </div>
          
          {/* Mobile Actions */}
          <MobileTaskActions task={task} onEdit={onEdit} />
        </div>
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 text-sm leading-tight">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Dates and Owner - Combined Row */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={10} />
            <span>{formatDate(task.startDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={10} />
            <span className="truncate max-w-20">{task.owner}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={10} />
          <span>End: {formatDate(task.endDate)}</span>
        </div>
      </div>

      {/* Comments Section - Only show if there are comments or user wants to add */}
      {(task.comments?.length > 0 || showComments) && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <MessageSquare size={10} />
            <span>{task.comments?.length || 0} comments</span>
          </button>

          {showComments && (
            <div className="mt-2 space-y-1.5">
              {task.comments?.map((comment) => (
                <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded p-1.5">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {comment.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{comment.text}</p>
                </div>
              ))}

              {showAddComment ? (
                <form onSubmit={handleAddComment} className="space-y-1.5">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    className="w-full p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                  <textarea
                    placeholder="Add a comment..."
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    className="w-full p-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                    rows="2"
                    required
                  />
                  <div className="flex gap-1.5">
                    <button
                      type="submit"
                      className="px-2 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddComment(false);
                        setNewComment({ name: '', text: '' });
                      }}
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-500"
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
                  <Plus size={10} />
                  Add comment
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Show minimal comment indicator if no comments and not expanded */}
      {task.comments?.length === 0 && !showComments && (
        <button
          onClick={() => setShowComments(true)}
          className="mt-2 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <Plus size={10} />
          Add comment
        </button>
      )}
    </div>
  );
};

export default TaskCard;