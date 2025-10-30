import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '../.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase connection...');
console.log('URL:', supabaseUrl ? 'Set ✅' : 'Missing ❌');
console.log('Key:', supabaseKey ? 'Set ✅' : 'Missing ❌');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
async function testConnection() {
  try {
    console.log('\n🔗 Testing database connection...');
    
    const { data, error } = await supabase
      .from('tasks')
      .select('count', { count: 'exact' })
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('\n💡 Make sure you have:');
      console.log('1. Created the tables using supabase/schema.sql');
      console.log('2. Set up Row Level Security policies');
      console.log('3. Verified your Supabase project is active');
      return false;
    }

    console.log('✅ Database connection successful!');
    console.log(`📊 Current task count: ${data?.length || 0}`);
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
}

testConnection();