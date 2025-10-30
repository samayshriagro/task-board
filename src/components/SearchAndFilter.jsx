import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTaskStore, PRIORITIES } from '../store/taskStoreSupabase';

const SearchAndFilter = () => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      {/* Mobile-first search bar */}
      <div className="p-4 pb-2 sm:p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
          />
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="px-4 pb-2 sm:hidden">
        <button
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="flex items-center justify-between w-full py-2 text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <Filter size={16} />
            Filters
            {hasActiveFilters && (
              <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-2 py-0.5 rounded-full">
                {[searchQuery, priorityFilter, ownerFilter].filter(Boolean).length}
              </span>
            )}
          </span>
          {isFiltersExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Desktop filters (always visible) and Mobile filters (collapsible) */}
      <div className={`${isFiltersExpanded ? 'block' : 'hidden'} sm:block px-4 pb-4`}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Priority Filter */}
          <div className="flex-1 sm:flex-none">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 sm:hidden">
              Priority
            </label>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400 hidden sm:block" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base sm:text-sm"
              >
                <option value="">All Priorities</option>
                <option value={PRIORITIES.LOW}>Low Priority</option>
                <option value={PRIORITIES.MEDIUM}>Medium Priority</option>
                <option value={PRIORITIES.HIGH}>High Priority</option>
              </select>
            </div>
          </div>

          {/* Owner Filter */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 sm:hidden">
              Owner
            </label>
            <input
              type="text"
              placeholder="Filter by owner..."
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base sm:text-sm"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex sm:block">
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 sm:py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={16} />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display - Mobile Optimized */}
      {hasActiveFilters && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm">
                <Search size={12} />
                <span className="max-w-[120px] truncate">"{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:bg-primary-200 dark:hover:bg-primary-800 rounded p-0.5 transition-colors"
                  aria-label="Remove search filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {priorityFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm">
                <Filter size={12} />
                {priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}
                <button 
                  onClick={() => setPriorityFilter('')}
                  className="hover:bg-primary-200 dark:hover:bg-primary-800 rounded p-0.5 transition-colors"
                  aria-label="Remove priority filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {ownerFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm">
                <span className="max-w-[100px] truncate">{ownerFilter}</span>
                <button 
                  onClick={() => setOwnerFilter('')}
                  className="hover:bg-primary-200 dark:hover:bg-primary-800 rounded p-0.5 transition-colors"
                  aria-label="Remove owner filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;