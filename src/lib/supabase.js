import { createClient } from '@supabase/supabase-js';

// These should be replaced with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database table names
export const TABLES = {
  TASKS: 'tasks',
  COMMENTS: 'task_comments'
};