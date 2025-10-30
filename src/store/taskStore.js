import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const TASK_STAGES = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  BLOCKED: 'blocked',
  COMPLETED: 'completed',
  DONE: 'done'
};

export const STAGE_LABELS = {
  [TASK_STAGES.TODO]: 'To-Do',
  [TASK_STAGES.IN_PROGRESS]: 'Work in Progress',
  [TASK_STAGES.BLOCKED]: 'Blocked',
  [TASK_STAGES.COMPLETED]: 'Completed',
  [TASK_STAGES.DONE]: 'Done'
};

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: 'priority-low',
  [PRIORITIES.MEDIUM]: 'priority-medium',
  [PRIORITIES.HIGH]: 'priority-high'
};

export const useTaskStore = create(
  persist(
    (set, get) => ({
      // State
      tasks: [],
      darkMode: false,
      searchQuery: '',
      priorityFilter: '',
      ownerFilter: '',

      // Task Management Actions
      addTask: (task) => {
        const newTask = {
          id: Date.now().toString(),
          ...task,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          comments: task.comments || []
        };
        set((state) => ({
          tasks: [...state.tasks, newTask]
        }));
      },

      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          )
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId)
        }));
      },

      moveTask: (taskId, newStage) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, stage: newStage, updatedAt: new Date().toISOString() }
              : task
          )
        }));
      },

      addComment: (taskId, comment) => {
        const newComment = {
          id: Date.now().toString(),
          ...comment,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  comments: [...(task.comments || []), newComment],
                  updatedAt: new Date().toISOString()
                }
              : task
          )
        }));
      },

      // Filter and Search Actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setPriorityFilter: (priority) => set({ priorityFilter: priority }),
      setOwnerFilter: (owner) => set({ ownerFilter: owner }),

      // Theme Actions
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Computed Getters
      getTasksByStage: (stage) => {
        const { tasks, searchQuery, priorityFilter, ownerFilter } = get();
        
        return tasks
          .filter((task) => task.stage === stage)
          .filter((task) => {
            const matchesSearch = !searchQuery || 
              task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              task.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesPriority = !priorityFilter || task.priority === priorityFilter;
            const matchesOwner = !ownerFilter || task.owner.toLowerCase().includes(ownerFilter.toLowerCase());
            
            return matchesSearch && matchesPriority && matchesOwner;
          })
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      },

      getTaskCounts: () => {
        const { tasks } = get();
        const counts = {};
        
        Object.values(TASK_STAGES).forEach(stage => {
          counts[stage] = tasks.filter(task => task.stage === stage).length;
        });
        
        return counts;
      }
    }),
    {
      name: 'task-store',
      partialize: (state) => ({
        tasks: state.tasks,
        darkMode: state.darkMode
      })
    }
  )
);