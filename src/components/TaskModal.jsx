import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTaskStore, TASK_STAGES, PRIORITIES } from '../store/taskStoreSupabase';
import { validateDateRange, formatDateForInput, parseDateInput, isValidDateFormat } from '../utils/dateUtils';

const TaskModal = ({ isOpen, onClose, task = null }) => {
  const { addTask, updateTask } = useTaskStore();
  const isEditing = !!task;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: PRIORITIES.MEDIUM,
    owner: '',
    stage: TASK_STAGES.TODO
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        startDate: formatDateForInput(task.startDate) || '',
        endDate: formatDateForInput(task.endDate) || '',
        priority: task.priority || PRIORITIES.MEDIUM,
        owner: task.owner || '',
        stage: task.stage || TASK_STAGES.TODO
      });
    } else {
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: PRIORITIES.MEDIUM,
        owner: '',
        stage: TASK_STAGES.TODO
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.owner.trim()) {
      newErrors.owner = 'Owner is required';
    }

    // Validate date formats
    if (formData.startDate && !isValidDateFormat(formData.startDate)) {
      newErrors.startDate = 'Please enter date in DD/MM/YYYY format';
    }

    if (formData.endDate && !isValidDateFormat(formData.endDate)) {
      newErrors.endDate = 'Please enter date in DD/MM/YYYY format';
    }

    // Validate date range if both dates are valid
    if (formData.startDate && formData.endDate && 
        isValidDateFormat(formData.startDate) && isValidDateFormat(formData.endDate)) {
      const startDateISO = parseDateInput(formData.startDate);
      const endDateISO = parseDateInput(formData.endDate);
      
      if (startDateISO && endDateISO && !validateDateRange(startDateISO, endDateISO)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      startDate: formData.startDate ? parseDateInput(formData.startDate) : null,
      endDate: formData.endDate ? parseDateInput(formData.endDate) : null
    };

    if (isEditing) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Auto-format date inputs
    if (name === 'startDate' || name === 'endDate') {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');
      
      // Format as DD/MM/YYYY
      if (digits.length >= 1) {
        if (digits.length <= 2) {
          processedValue = digits;
        } else if (digits.length <= 4) {
          processedValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        } else if (digits.length <= 8) {
          processedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
        } else {
          // Limit to 8 digits (DDMMYYYY)
          processedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
        }
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter task title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Enter task description"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                maxLength="10"
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="DD/MM/YYYY"
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                maxLength="10"
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="DD/MM/YYYY"
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          {/* Priority and Owner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value={PRIORITIES.LOW}>Low</option>
                <option value={PRIORITIES.MEDIUM}>Medium</option>
                <option value={PRIORITIES.HIGH}>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Owner *
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.owner ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter owner name"
              />
              {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
            </div>
          </div>

          {/* Stage (only for editing) */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stage
              </label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value={TASK_STAGES.TODO}>To-Do</option>
                <option value={TASK_STAGES.IN_PROGRESS}>Work in Progress</option>
                <option value={TASK_STAGES.BLOCKED}>Blocked</option>
                <option value={TASK_STAGES.COMPLETED}>Completed</option>
                <option value={TASK_STAGES.DONE}>Done</option>
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;