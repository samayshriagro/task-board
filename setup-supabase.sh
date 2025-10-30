#!/bin/bash

# Supabase Task Manager Setup Script

echo "🚀 Setting up Supabase for Task Manager"
echo "======================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "🔧 Please update .env file with your Supabase credentials:"
    echo "   VITE_SUPABASE_URL=your-project-url"
    echo "   VITE_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
else
    echo "✅ .env file already exists"
fi

echo "📋 Next steps:"
echo "1. Go to https://supabase.com and create a new project"
echo "2. Copy your project URL and anon key to .env file"
echo "3. Run the SQL scripts in your Supabase SQL editor:"
echo "   - supabase/schema.sql (to create tables)"
echo "   - supabase/sample-data.sql (to insert sample data)"
echo "4. Update imports to use Supabase store (see setup instructions)"
echo ""

echo "🔗 Useful Supabase SQL scripts:"
echo "   📁 supabase/schema.sql - Database tables and structure"
echo "   📊 supabase/sample-data.sql - Sample tasks and comments"
echo ""

echo "📖 To switch to Supabase mode:"
echo "   Replace 'taskStore' imports with 'taskStoreSupabase'"
echo ""

echo "Setup complete! 🎉"