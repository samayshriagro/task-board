import { supabase, TABLES } from '../lib/supabase';

export class SupabaseTaskService {
  // Fetch all tasks
  static async getAllTasks() {
    try {
      const { data, error } = await supabase
        .from(TABLES.TASKS)
        .select(`
          *,
          task_comments (*)
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Transform data to match our app structure
      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        startDate: task.start_date,
        endDate: task.end_date,
        priority: task.priority,
        owner: task.owner,
        stage: task.stage,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        comments: task.task_comments?.map(comment => ({
          id: comment.id,
          name: comment.name,
          text: comment.text,
          createdAt: comment.created_at
        })) || []
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  // Create a new task
  static async createTask(taskData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TASKS)
        .insert({
          title: taskData.title,
          description: taskData.description,
          start_date: taskData.startDate || null,
          end_date: taskData.endDate || null,
          priority: taskData.priority,
          owner: taskData.owner,
          stage: taskData.stage
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        startDate: data.start_date,
        endDate: data.end_date,
        priority: data.priority,
        owner: data.owner,
        stage: data.stage,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        comments: []
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  // Update a task
  static async updateTask(taskId, updates) {
    try {
      const updateData = {};
      
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.startDate !== undefined) updateData.start_date = updates.startDate;
      if (updates.endDate !== undefined) updateData.end_date = updates.endDate;
      if (updates.priority !== undefined) updateData.priority = updates.priority;
      if (updates.owner !== undefined) updateData.owner = updates.owner;
      if (updates.stage !== undefined) updateData.stage = updates.stage;

      const { data, error } = await supabase
        .from(TABLES.TASKS)
        .update(updateData)
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        startDate: data.start_date,
        endDate: data.end_date,
        priority: data.priority,
        owner: data.owner,
        stage: data.stage,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete a task
  static async deleteTask(taskId) {
    try {
      const { error } = await supabase
        .from(TABLES.TASKS)
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Add a comment to a task
  static async addComment(taskId, commentData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.COMMENTS)
        .insert({
          task_id: taskId,
          name: commentData.name,
          text: commentData.text
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        text: data.text,
        createdAt: data.created_at
      };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Get tasks by stage
  static async getTasksByStage(stage) {
    try {
      const { data, error } = await supabase
        .from(TABLES.TASKS)
        .select(`
          *,
          task_comments (*)
        `)
        .eq('stage', stage)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        startDate: task.start_date,
        endDate: task.end_date,
        priority: task.priority,
        owner: task.owner,
        stage: task.stage,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        comments: task.task_comments?.map(comment => ({
          id: comment.id,
          name: comment.name,
          text: comment.text,
          createdAt: comment.created_at
        })) || []
      }));
    } catch (error) {
      console.error('Error fetching tasks by stage:', error);
      throw error;
    }
  }

  // Search tasks
  static async searchTasks(query, filters = {}) {
    try {
      let supabaseQuery = supabase
        .from(TABLES.TASKS)
        .select(`
          *,
          task_comments (*)
        `);

      // Add text search
      if (query) {
        supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }

      // Add filters
      if (filters.priority) {
        supabaseQuery = supabaseQuery.eq('priority', filters.priority);
      }

      if (filters.owner) {
        supabaseQuery = supabaseQuery.ilike('owner', `%${filters.owner}%`);
      }

      if (filters.stage) {
        supabaseQuery = supabaseQuery.eq('stage', filters.stage);
      }

      const { data, error } = await supabaseQuery.order('updated_at', { ascending: false });

      if (error) throw error;

      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        startDate: task.start_date,
        endDate: task.end_date,
        priority: task.priority,
        owner: task.owner,
        stage: task.stage,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
        comments: task.task_comments?.map(comment => ({
          id: comment.id,
          name: comment.name,
          text: comment.text,
          createdAt: comment.created_at
        })) || []
      }));
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw error;
    }
  }

  // Real-time subscription to tasks
  static subscribeToTasks(callback) {
    const subscription = supabase
      .channel('tasks')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: TABLES.TASKS 
      }, callback)
      .subscribe();

    return subscription;
  }

  // Real-time subscription to comments
  static subscribeToComments(callback) {
    const subscription = supabase
      .channel('comments')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: TABLES.COMMENTS 
      }, callback)
      .subscribe();

    return subscription;
  }
}