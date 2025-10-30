-- Insert sample tasks
INSERT INTO tasks (title, description, start_date, end_date, priority, owner, stage) VALUES
('Design Homepage Layout', 'Create wireframes and mockups for the new homepage design with modern UI components.', '2024-10-25', '2024-11-01', 'high', 'Alice Johnson', 'todo'),
('Implement User Authentication', 'Set up login/logout functionality with JWT tokens and password reset capability.', '2024-10-26', '2024-11-03', 'medium', 'Bob Smith', 'in-progress'),
('Database Schema Migration', 'Update database schema to support new user roles and permissions system.', '2024-10-20', '2024-10-30', 'high', 'Carol Davis', 'blocked'),
('API Documentation', 'Complete documentation for all REST API endpoints with examples and error codes.', '2024-10-15', '2024-10-28', 'low', 'David Wilson', 'completed'),
('Unit Testing Setup', 'Configure Jest and write initial unit tests for core components.', '2024-10-10', '2024-10-25', 'medium', 'Eve Brown', 'done'),
('Mobile Responsive Design', 'Ensure all pages work perfectly on mobile devices and tablets.', '2024-10-28', '2024-11-05', 'high', 'Frank Miller', 'todo'),
('Performance Optimization', 'Optimize application performance, reduce bundle size, and improve loading times.', '2024-10-24', '2024-11-02', 'medium', 'Grace Lee', 'in-progress'),
('Search Functionality', 'Implement global search across all tasks with filters and sorting options.', '2024-10-29', '2024-11-07', 'low', 'Henry Zhang', 'todo'),
('Dark Mode Implementation', 'Add dark mode support with smooth transitions and user preference storage.', '2024-10-30', '2024-11-08', 'low', 'Isabel Chen', 'todo'),
('Export Features', 'Allow users to export tasks to PDF and CSV formats with custom formatting.', '2024-11-01', '2024-11-10', 'medium', 'Jack Wilson', 'todo');

-- Insert sample comments for some tasks
INSERT INTO task_comments (task_id, name, text) VALUES
((SELECT id FROM tasks WHERE title = 'Design Homepage Layout'), 'Alice Johnson', 'Started working on the wireframes. Will share the initial mockups by tomorrow.'),
((SELECT id FROM tasks WHERE title = 'Design Homepage Layout'), 'Sarah Manager', 'Looking forward to seeing the designs. Please ensure mobile-first approach.'),
((SELECT id FROM tasks WHERE title = 'Implement User Authentication'), 'Bob Smith', 'JWT integration is complete. Working on password reset functionality now.'),
((SELECT id FROM tasks WHERE title = 'Implement User Authentication'), 'Tech Lead', 'Great progress! Make sure to implement proper token refresh mechanism.'),
((SELECT id FROM tasks WHERE title = 'Database Schema Migration'), 'Carol Davis', 'Migration scripts are ready but waiting for approval from the DBA team.'),
((SELECT id FROM tasks WHERE title = 'Database Schema Migration'), 'DBA Team', 'We need to review the performance impact. Please schedule a meeting.'),
((SELECT id FROM tasks WHERE title = 'API Documentation'), 'David Wilson', 'Documentation is 90% complete. Just need to add error code examples.'),
((SELECT id FROM tasks WHERE title = 'Unit Testing Setup'), 'Eve Brown', 'All tests are passing! Code coverage is at 85%.'),
((SELECT id FROM tasks WHERE title = 'Mobile Responsive Design'), 'Frank Miller', 'Starting with the task board component. Will test on various devices.'),
((SELECT id FROM tasks WHERE title = 'Performance Optimization'), 'Grace Lee', 'Identified several optimization opportunities. Bundle size reduced by 30% so far.');