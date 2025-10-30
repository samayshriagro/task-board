import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '../.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.log('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleTasks = [
  {
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design with modern UI components.',
    start_date: '2024-10-25',
    end_date: '2024-11-01',
    priority: 'high',
    owner: 'Alice Johnson',
    stage: 'todo'
  },
  {
    title: 'Implement User Authentication',
    description: 'Set up login/logout functionality with JWT tokens and password reset capability.',
    start_date: '2024-10-26',
    end_date: '2024-11-03',
    priority: 'medium',
    owner: 'Bob Smith',
    stage: 'in-progress'
  },
  {
    title: 'Database Schema Migration',
    description: 'Update database schema to support new user roles and permissions system.',
    start_date: '2024-10-20',
    end_date: '2024-10-30',
    priority: 'high',
    owner: 'Carol Davis',
    stage: 'blocked'
  },
  {
    title: 'API Documentation',
    description: 'Complete documentation for all REST API endpoints with examples and error codes.',
    start_date: '2024-10-15',
    end_date: '2024-10-28',
    priority: 'low',
    owner: 'David Wilson',
    stage: 'completed'
  },
  {
    title: 'Unit Testing Setup',
    description: 'Configure Jest and write initial unit tests for core components.',
    start_date: '2024-10-10',
    end_date: '2024-10-25',
    priority: 'medium',
    owner: 'Eve Brown',
    stage: 'done'
  },
  {
    title: 'Mobile Responsive Design',
    description: 'Ensure all pages work perfectly on mobile devices and tablets.',
    start_date: '2024-10-28',
    end_date: '2024-11-05',
    priority: 'high',
    owner: 'Frank Miller',
    stage: 'todo'
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize application performance, reduce bundle size, and improve loading times.',
    start_date: '2024-10-24',
    end_date: '2024-11-02',
    priority: 'medium',
    owner: 'Grace Lee',
    stage: 'in-progress'
  },
  {
    title: 'Search Functionality',
    description: 'Implement global search across all tasks with filters and sorting options.',
    start_date: '2024-10-29',
    end_date: '2024-11-07',
    priority: 'low',
    owner: 'Henry Zhang',
    stage: 'todo'
  },
  {
    title: 'Dark Mode Implementation',
    description: 'Add dark mode support with smooth transitions and user preference storage.',
    start_date: '2024-10-30',
    end_date: '2024-11-08',
    priority: 'low',
    owner: 'Isabel Chen',
    stage: 'todo'
  },
  {
    title: 'Export Features',
    description: 'Allow users to export tasks to PDF and CSV formats with custom formatting.',
    start_date: '2024-11-01',
    end_date: '2024-11-10',
    priority: 'medium',
    owner: 'Jack Wilson',
    stage: 'todo'
  }
];

const sampleComments = [
  {
    taskTitle: 'Design Homepage Layout',
    comments: [
      { name: 'Alice Johnson', text: 'Started working on the wireframes. Will share the initial mockups by tomorrow.' },
      { name: 'Sarah Manager', text: 'Looking forward to seeing the designs. Please ensure mobile-first approach.' }
    ]
  },
  {
    taskTitle: 'Implement User Authentication',
    comments: [
      { name: 'Bob Smith', text: 'JWT integration is complete. Working on password reset functionality now.' },
      { name: 'Tech Lead', text: 'Great progress! Make sure to implement proper token refresh mechanism.' }
    ]
  },
  {
    taskTitle: 'Database Schema Migration',
    comments: [
      { name: 'Carol Davis', text: 'Migration scripts are ready but waiting for approval from the DBA team.' },
      { name: 'DBA Team', text: 'We need to review the performance impact. Please schedule a meeting.' }
    ]
  },
  {
    taskTitle: 'API Documentation',
    comments: [
      { name: 'David Wilson', text: 'Documentation is 90% complete. Just need to add error code examples.' }
    ]
  },
  {
    taskTitle: 'Unit Testing Setup',
    comments: [
      { name: 'Eve Brown', text: 'All tests are passing! Code coverage is at 85%.' }
    ]
  },
  {
    taskTitle: 'Mobile Responsive Design',
    comments: [
      { name: 'Frank Miller', text: 'Starting with the task board component. Will test on various devices.' }
    ]
  },
  {
    taskTitle: 'Performance Optimization',
    comments: [
      { name: 'Grace Lee', text: 'Identified several optimization opportunities. Bundle size reduced by 30% so far.' }
    ]
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Check connection
    const { data: testData, error: testError } = await supabase
      .from('tasks')
      .select('count', { count: 'exact' });

    if (testError) {
      console.error('❌ Failed to connect to Supabase:', testError.message);
      console.log('Make sure your .env file has the correct credentials and the database schema is set up.');
      return;
    }

    console.log('✅ Connected to Supabase successfully\n');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    const { error: deleteCommentsError } = await supabase
      .from('task_comments')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    const { error: deleteTasksError } = await supabase
      .from('tasks')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteTasksError || deleteCommentsError) {
      console.error('❌ Error clearing data:', deleteTasksError || deleteCommentsError);
      return;
    }

    console.log('✅ Existing data cleared\n');

    // Insert tasks
    console.log('📝 Inserting tasks...');
    const { data: insertedTasks, error: tasksError } = await supabase
      .from('tasks')
      .insert(sampleTasks)
      .select();

    if (tasksError) {
      console.error('❌ Error inserting tasks:', tasksError);
      return;
    }

    console.log(`✅ Inserted ${insertedTasks.length} tasks\n`);

    // Insert comments
    console.log('💬 Inserting comments...');
    let totalComments = 0;

    for (const commentGroup of sampleComments) {
      const task = insertedTasks.find(t => t.title === commentGroup.taskTitle);
      if (task) {
        const commentsToInsert = commentGroup.comments.map(comment => ({
          task_id: task.id,
          name: comment.name,
          text: comment.text
        }));

        const { data: insertedComments, error: commentsError } = await supabase
          .from('task_comments')
          .insert(commentsToInsert)
          .select();

        if (commentsError) {
          console.error(`❌ Error inserting comments for "${task.title}":`, commentsError);
        } else {
          totalComments += insertedComments.length;
        }
      }
    }

    console.log(`✅ Inserted ${totalComments} comments\n`);

    // Verify data
    console.log('🔍 Verifying inserted data...');
    const { data: finalTasks, error: verifyError } = await supabase
      .from('tasks')
      .select(`
        *,
        task_comments (count)
      `);

    if (verifyError) {
      console.error('❌ Error verifying data:', verifyError);
      return;
    }

    console.log('\n📊 Database Summary:');
    console.log('==================');

    const stageCounts = {};
    const priorityCounts = {};

    finalTasks.forEach(task => {
      stageCounts[task.stage] = (stageCounts[task.stage] || 0) + 1;
      priorityCounts[task.priority] = (priorityCounts[task.priority] || 0) + 1;
    });

    console.log('\n📋 Tasks by Stage:');
    Object.entries(stageCounts).forEach(([stage, count]) => {
      console.log(`  ${stage}: ${count} tasks`);
    });

    console.log('\n⚡ Tasks by Priority:');
    Object.entries(priorityCounts).forEach(([priority, count]) => {
      console.log(`  ${priority}: ${count} tasks`);
    });

    console.log(`\n💬 Total Comments: ${totalComments}`);
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n🚀 You can now start your application and see the sample data.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the seeding
seedDatabase();