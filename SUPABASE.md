# Supabase Integration Guide

This guide will help you set up Supabase as the backend for your Task Management application.

## 🚀 Quick Setup

1. **Run the setup script:**
   ```bash
   ./setup-supabase.sh
   ```

2. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

3. **Configure environment variables:**
   ```bash
   # Update .env file
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set up the database:**
   - Open your Supabase dashboard
   - Go to SQL Editor
   - Run `supabase/schema.sql` to create tables
   - Run `supabase/sample-data.sql` to insert sample data

5. **Switch to Supabase store:**
   ```javascript
   // In your components, replace:
   import { useTaskStore } from '../store/taskStore';
   
   // With:
   import { useTaskStore } from '../store/taskStoreSupabase';
   ```

## 📋 Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')),
  owner VARCHAR(100) NOT NULL,
  stage VARCHAR(20) CHECK (stage IN ('todo', 'in-progress', 'blocked', 'completed', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Comments Table
```sql
CREATE TABLE task_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Manual Database Setup

If you prefer to set up the database manually:

### 1. Create Tables
Copy and paste the contents of `supabase/schema.sql` into your Supabase SQL Editor.

### 2. Insert Sample Data
Copy and paste the contents of `supabase/sample-data.sql` into your Supabase SQL Editor.

### 3. Verify Setup
Run this query to check if everything is working:
```sql
SELECT 
  t.title, 
  t.stage, 
  t.priority,
  COUNT(c.id) as comment_count
FROM tasks t
LEFT JOIN task_comments c ON t.id = c.task_id
GROUP BY t.id, t.title, t.stage, t.priority
ORDER BY t.created_at DESC;
```

## 📊 Sample Data

The sample data includes:
- **10 tasks** across different stages and priorities
- **10+ comments** on various tasks
- **Realistic project scenarios** with different owners

Sample tasks include:
- Design Homepage Layout (High Priority, To-Do)
- Implement User Authentication (Medium Priority, In Progress)
- Database Schema Migration (High Priority, Blocked)
- API Documentation (Low Priority, Completed)
- Unit Testing Setup (Medium Priority, Done)

## 🔄 Real-time Features

The Supabase integration includes real-time synchronization:

```javascript
// Subscribe to task changes
const subscription = SupabaseTaskService.subscribeToTasks((payload) => {
  console.log('Task changed:', payload);
  // Handle real-time updates
});

// Subscribe to comment changes
const commentSubscription = SupabaseTaskService.subscribeToComments((payload) => {
  console.log('Comment changed:', payload);
  // Handle real-time updates
});
```

## 🔐 Security Configuration

The current setup uses public access policies for simplicity:

```sql
-- Public access (modify for production use)
CREATE POLICY "Tasks are publicly accessible" ON tasks FOR ALL USING (true);
CREATE POLICY "Comments are publicly accessible" ON task_comments FOR ALL USING (true);
```

### For Production:
1. **Enable authentication:**
   ```sql
   -- Example: User-specific access
   CREATE POLICY "Users can manage their tasks" ON tasks 
   FOR ALL USING (auth.uid() = user_id);
   ```

2. **Add user_id column:**
   ```sql
   ALTER TABLE tasks ADD COLUMN user_id UUID REFERENCES auth.users(id);
   ```

3. **Update policies accordingly**

## 📱 Offline Support

The app includes offline-first functionality:
- **Local storage fallback** when Supabase is unavailable
- **Automatic sync** when connection is restored
- **Connection status indicator** in the header
- **Error handling** with user feedback

## 🎯 API Methods

### Task Operations:
- `getAllTasks()` - Fetch all tasks with comments
- `createTask(taskData)` - Create a new task
- `updateTask(taskId, updates)` - Update existing task
- `deleteTask(taskId)` - Delete a task
- `getTasksByStage(stage)` - Get tasks filtered by stage

### Comment Operations:
- `addComment(taskId, commentData)` - Add comment to task

### Search & Filter:
- `searchTasks(query, filters)` - Search with filters

### Real-time:
- `subscribeToTasks(callback)` - Real-time task updates
- `subscribeToComments(callback)` - Real-time comment updates

## 🚀 Deployment

### Environment Variables for Production:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### Build for Production:
```bash
npm run build
```

The built application will automatically use your Supabase backend for data persistence.

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure your domain is added to Supabase allowed origins
   - Check that anon key has proper permissions

2. **Connection Issues:**
   - Verify environment variables are set correctly
   - Check network connectivity
   - App will fall back to localStorage if Supabase fails

3. **Policy Errors:**
   - Ensure RLS policies are properly configured
   - Check if anon role has necessary permissions

4. **Data Not Syncing:**
   - Check browser console for errors
   - Verify API calls in Network tab
   - Ensure database triggers are working

### Debug Mode:
Enable debug logging by adding to your .env:
```bash
VITE_DEBUG=true
```

## 📈 Performance Tips

1. **Indexing:** The schema includes optimized indexes for common queries
2. **Pagination:** For large datasets, implement pagination
3. **Caching:** Consider implementing client-side caching for frequently accessed data
4. **Batch Operations:** Use batch inserts/updates for multiple operations

## 🔮 Future Enhancements

- **User Authentication:** Add user login/signup
- **Team Collaboration:** Multi-user workspaces
- **File Attachments:** Upload files to tasks
- **Push Notifications:** Real-time task notifications
- **Advanced Permissions:** Role-based access control
- **Analytics:** Task completion metrics and reporting

---

For more information, visit the [Supabase Documentation](https://supabase.com/docs).