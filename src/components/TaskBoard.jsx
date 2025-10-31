import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTaskStore, TASK_STAGES } from '../store/taskStoreSupabase';
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import SearchAndFilter from './SearchAndFilter';
import Header from './Header';
import TabNavigation from './TabNavigation';
import { useIsMobile } from '../utils/deviceUtils';

const TaskBoard = () => {
  const { tasks, moveTask } = useTaskStore();
  const [activeId, setActiveId] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState(TASK_STAGES.TODO);
  const isMobile = useIsMobile();

  // Create sensors - always create them to maintain consistency
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    if (isMobile) return; // Don't handle drag events on mobile
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    if (isMobile) return; // Don't handle drag events on mobile
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overId = over.id;

    // If dropping over a column
    if (Object.values(TASK_STAGES).includes(overId)) {
      if (activeTask && activeTask.stage !== overId) {
        moveTask(active.id, overId);
      }
    }
  };

  const handleDragEnd = (event) => {
    if (isMobile) return; // Don't handle drag events on mobile
    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleTabChange = (stage) => {
    setActiveTab(stage);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onCreateTask={handleCreateTask} />
      
      <div className="container mx-auto px-4 py-6">
        <SearchAndFilter />
        
        {/* Tab Navigation for Mobile */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* Desktop View - All Columns */}
          <div className="hidden lg:flex gap-6 overflow-x-auto pb-6">
            {Object.values(TASK_STAGES).map((stage) => (
              <div key={stage} className="flex-shrink-0">
                <TaskColumn stage={stage} onEditTask={handleEditTask} />
              </div>
            ))}
          </div>

          {/* Mobile View - Single Active Tab */}
          <div className="lg:hidden">
            <TaskColumn stage={activeTab} onEditTask={handleEditTask} />
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} isDragOver={true} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={handleCloseModal}
        task={editingTask}
      />

      {/* Mobile Floating Action Button */}
      <button
        onClick={handleCreateTask}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 z-50"
        aria-label="Create new task"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default TaskBoard;