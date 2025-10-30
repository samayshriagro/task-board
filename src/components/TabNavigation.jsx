import React, { useState } from 'react';
import { useTaskStore, TASK_STAGES, STAGE_LABELS } from '../store/taskStoreSupabase';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const { getTaskCounts } = useTaskStore();
  const taskCounts = getTaskCounts();

  return (
    <div className="lg:hidden mb-6">
      {/* Mobile Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-700">
        {Object.values(TASK_STAGES).map((stage) => (
          <button
            key={stage}
            onClick={() => onTabChange(stage)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === stage
                ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              {STAGE_LABELS[stage]}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeTab === stage
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {taskCounts[stage] || 0}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;