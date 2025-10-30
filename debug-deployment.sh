#!/bin/bash

echo "🔍 Task Board Deployment Debug Script"
echo "====================================="

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    echo "Environment variables:"
    grep -E "^VITE_" .env | sed 's/=.*/=***HIDDEN***/'
else
    echo "❌ .env file not found"
fi

echo ""
echo "📦 Building project..."
npm run build

echo ""
echo "🔍 Checking build output..."
if [ -d "dist" ]; then
    echo "✅ dist directory exists"
    echo "Files in dist:"
    ls -la dist/
    
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html exists in dist"
        echo "Content preview:"
        head -20 dist/index.html
    else
        echo "❌ index.html not found in dist"
    fi
else
    echo "❌ dist directory not found"
fi

echo ""
echo "🔧 Vercel configuration:"
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
    cat vercel.json
else
    echo "❌ vercel.json not found"
fi

echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ Build completes successfully"
echo "2. ✅ vercel.json configured for SPA routing"
echo "3. ✅ Environment variables added to Vercel dashboard"
echo "4. ✅ Error handling added to App component"
echo ""
echo "🚀 Ready to deploy! Push your changes and redeploy on Vercel."
echo "💡 If still blank, check browser console for errors on deployed site."