import { useEffect } from 'react';
import { useTaskStore, TASK_STAGES, PRIORITIES } from '../store/taskStore';

const useSampleData = () => {
  const { tasks, addTask } = useTaskStore();

  useEffect(() => {
    // Only add sample data if no tasks exist
    if (tasks.length === 0) {
      const sampleTasks = [
        {
          title: 'Design Homepage Layout',
          description: 'Create wireframes and mockups for the new homepage design with modern UI components.',
          startDate: '2024-10-25',
          endDate: '2024-11-01',
          priority: PRIORITIES.HIGH,
          owner: 'Alice Johnson',
          stage: TASK_STAGES.TODO,
        },
        {
          title: 'Implement User Authentication',
          description: 'Set up login/logout functionality with JWT tokens and password reset capability.',
          startDate: '2024-10-26',
          endDate: '2024-11-03',
          priority: PRIORITIES.MEDIUM,
          owner: 'Bob Smith',
          stage: TASK_STAGES.IN_PROGRESS,
        },
        {
          title: 'Database Schema Migration',
          description: 'Update database schema to support new user roles and permissions system.',
          startDate: '2024-10-20',
          endDate: '2024-10-30',
          priority: PRIORITIES.HIGH,
          owner: 'Carol Davis',
          stage: TASK_STAGES.BLOCKED,
        },
        {
          title: 'API Documentation',
          description: 'Complete documentation for all REST API endpoints with examples and error codes.',
          startDate: '2024-10-15',
          endDate: '2024-10-28',
          priority: PRIORITIES.LOW,
          owner: 'David Wilson',
          stage: TASK_STAGES.COMPLETED,
        },
        {
          title: 'Unit Testing Setup',
          description: 'Configure Jest and write initial unit tests for core components.',
          startDate: '2024-10-10',
          endDate: '2024-10-25',
          priority: PRIORITIES.MEDIUM,
          owner: 'Eve Brown',
          stage: TASK_STAGES.DONE,
        },
        {
          title: 'Mobile Responsive Design',
          description: 'Ensure all pages work perfectly on mobile devices and tablets.',
          startDate: '2024-10-28',
          endDate: '2024-11-05',
          priority: PRIORITIES.HIGH,
          owner: 'Frank Miller',
          stage: TASK_STAGES.TODO,
        },
        {
          title: 'Performance Optimization',
          description: 'Optimize application performance, reduce bundle size, and improve loading times.',
          startDate: '2024-10-24',
          endDate: '2024-11-02',
          priority: PRIORITIES.MEDIUM,
          owner: 'Grace Lee',
          stage: TASK_STAGES.IN_PROGRESS,
        }
      ];

      // Add sample tasks with a small delay to avoid rapid fire
      sampleTasks.forEach((task, index) => {
        setTimeout(() => {
          addTask(task);
        }, index * 100);
      });
    }
  }, [tasks.length, addTask]);
};

export default useSampleData;