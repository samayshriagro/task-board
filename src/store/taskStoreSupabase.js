import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SupabaseTaskService } from '../services/supabaseTaskService';

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
      isOnline: true,
      isLoading: false,
      error: null,

      // Connection Management
      setOnline: (online) => set({ isOnline: online }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      // Initialize store - load data from Supabase or use localStorage as fallback
      initializeStore: async () => {
        const { isOnline, setLoading, setError } = get();
        
        if (isOnline) {
          try {
            setLoading(true);
            setError(null);
            const tasks = await SupabaseTaskService.getAllTasks();
            set({ tasks });
          } catch (error) {
            console.error('Failed to load tasks from Supabase:', error);
            setError('Failed to load tasks from server. Using local data.');
            set({ isOnline: false });
          } finally {
            setLoading(false);
          }
        }
      },

      // Task Management Actions (with Supabase sync)
      addTask: async (task) => {
        const { isOnline, tasks } = get();
        
        try {
          set({ isLoading: true, error: null });
          
          if (isOnline) {
            const newTask = await SupabaseTaskService.createTask(task);
            set({ tasks: [...tasks, newTask] });
          } else {
            // Fallback to local storage
            const newTask = {
              id: Date.now().toString(),
              ...task,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              comments: task.comments || []
            };
            set({ tasks: [...tasks, newTask] });
          }
        } catch (error) {
          console.error('Error adding task:', error);
          set({ error: 'Failed to add task' });
        } finally {
          set({ isLoading: false });
        }
      },

      updateTask: async (taskId, updates) => {
        const { isOnline, tasks } = get();
        
        try {
          set({ isLoading: true, error: null });
          
          if (isOnline) {
            await SupabaseTaskService.updateTask(taskId, updates);
            // Optimistic update
            set({
              tasks: tasks.map((task) =>
                task.id === taskId
                  ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                  : task
              )
            });
          } else {
            // Local update
            set({
              tasks: tasks.map((task) =>
                task.id === taskId
                  ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                  : task
              )
            });
          }
        } catch (error) {
          console.error('Error updating task:', error);
          set({ error: 'Failed to update task' });
        } finally {
          set({ isLoading: false });
        }
      },

      deleteTask: async (taskId) => {
        const { isOnline, tasks } = get();
        
        try {
          set({ isLoading: true, error: null });
          
          if (isOnline) {
            await SupabaseTaskService.deleteTask(taskId);
          }
          
          set({ tasks: tasks.filter((task) => task.id !== taskId) });
        } catch (error) {
          console.error('Error deleting task:', error);
          set({ error: 'Failed to delete task' });
        } finally {
          set({ isLoading: false });
        }
      },

      moveTask: async (taskId, newStage) => {
        const { updateTask } = get();
        await updateTask(taskId, { stage: newStage });
      },

      addComment: async (taskId, comment) => {
        const { isOnline, tasks } = get();
        
        try {
          set({ isLoading: true, error: null });
          
          if (isOnline) {
            const newComment = await SupabaseTaskService.addComment(taskId, comment);
            set({
              tasks: tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      comments: [...(task.comments || []), newComment],
                      updatedAt: new Date().toISOString()
                    }
                  : task
              )
            });
          } else {
            // Local comment
            const newComment = {
              id: Date.now().toString(),
              ...comment,
              createdAt: new Date().toISOString()
            };
            set({
              tasks: tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      comments: [...(task.comments || []), newComment],
                      updatedAt: new Date().toISOString()
                    }
                  : task
              )
            });
          }
        } catch (error) {
          console.error('Error adding comment:', error);
          set({ error: 'Failed to add comment' });
        } finally {
          set({ isLoading: false });
        }
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
      },

      // Sync with Supabase
      syncWithSupabase: async () => {
        const { initializeStore } = get();
        await initializeStore();
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