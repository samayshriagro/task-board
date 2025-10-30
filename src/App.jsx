import React, { useEffect } from 'react';
import TaskBoard from './components/TaskBoard';
import { useTaskStore } from './store/taskStoreSupabase';

function App() {
  const { darkMode, initializeStore } = useTaskStore();
  
  // Initialize store with Supabase data
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <TaskBoard />;
}

export default App;
