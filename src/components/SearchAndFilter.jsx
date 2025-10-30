import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useTaskStore, PRIORITIES } from '../store/taskStoreSupabase';

const SearchAndFilter = () => {
  const {
    searchQuery,
    priorityFilter,
    ownerFilter,
    setSearchQuery,
    setPriorityFilter,
    setOwnerFilter
  } = useTaskStore();

  const clearFilters = () => {
    setSearchQuery('');
    setPriorityFilter('');
    setOwnerFilter('');
  };

  const hasActiveFilters = searchQuery || priorityFilter || ownerFilter;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value={PRIORITIES.LOW}>Low Priority</option>
            <option value={PRIORITIES.MEDIUM}>Medium Priority</option>
            <option value={PRIORITIES.HIGH}>High Priority</option>
          </select>
        </div>

        {/* Owner Filter */}
        <div className="flex-1 sm:flex-initial">
          <input
            type="text"
            placeholder="Filter by owner..."
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <X size={16} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-sm">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>
                <X size={12} />
              </button>
            </span>
          )}
          {priorityFilter && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-sm">
              Priority: {priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}
              <button onClick={() => setPriorityFilter('')}>
                <X size={12} />
              </button>
            </span>
          )}
          {ownerFilter && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-sm">
              Owner: {ownerFilter}
              <button onClick={() => setOwnerFilter('')}>
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;