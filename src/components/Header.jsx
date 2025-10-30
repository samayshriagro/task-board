import React from 'react';
import { Plus, Moon, Sun, Kanban } from 'lucide-react';
import { useTaskStore } from '../store/taskStoreSupabase';
import ConnectionStatus from './ConnectionStatus';

const Header = ({ onCreateTask }) => {
  const { darkMode, toggleDarkMode } = useTaskStore();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Kanban size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Task Manager
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Organize your workflow efficiently
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Connection Status */}
            <ConnectionStatus />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun size={20} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon size={20} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Create Task Button - Hidden on mobile, shown on desktop */}
            <button
              onClick={onCreateTask}
              className="hidden lg:flex items-center gap-2 btn-primary"
            >
              <Plus size={20} />
              <span>Create Task</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;