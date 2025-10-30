import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '../.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetDatabase() {
  console.log('🧹 Resetting database...\n');

  try {
    // Delete all comments first (due to foreign key constraint)
    console.log('💬 Deleting all comments...');
    const { error: deleteCommentsError } = await supabase
      .from('task_comments')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteCommentsError) {
      console.error('❌ Error deleting comments:', deleteCommentsError);
      return;
    }

    console.log('✅ All comments deleted');

    // Delete all tasks
    console.log('📝 Deleting all tasks...');
    const { error: deleteTasksError } = await supabase
      .from('tasks')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteTasksError) {
      console.error('❌ Error deleting tasks:', deleteTasksError);
      return;
    }

    console.log('✅ All tasks deleted');

    // Verify deletion
    const { data: remainingTasks, error: verifyError } = await supabase
      .from('tasks')
      .select('count', { count: 'exact' });

    if (verifyError) {
      console.error('❌ Error verifying deletion:', verifyError);
      return;
    }

    console.log(`\n🔍 Verification: ${remainingTasks.length || 0} tasks remaining`);
    console.log('\n✅ Database reset completed successfully!');
    console.log('\n💡 Run "npm run seed" to populate with sample data.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the reset
resetDatabase();