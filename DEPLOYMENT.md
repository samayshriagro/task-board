# Vercel Deployment Guide

This guide will help you deploy your Task Board application to Vercel.

## 🚀 Quick Deployment

### Prerequisites

1. **Install Vercel CLI** (optional, for command line deployment):
   ```bash
   npm i -g vercel
   ```

2. **Prepare your Supabase project:**
   - Ensure your Supabase project is set up and configured
   - Have your Supabase URL and anon key ready

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect your repository:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub/GitLab/Bitbucket account
   - Click "New Project"
   - Import your task-board repository

2. **Configure build settings:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

3. **Set environment variables:**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add the following variables:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy from project root:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new one
   - Confirm project settings
   - Set environment variables when prompted

4. **Set environment variables:**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

5. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

## 📋 Environment Variables Setup

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGciOiJIUzI1NiIs...` |

### How to get Supabase credentials:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and anon public key

## 🔧 Configuration Files

The following files have been configured for Vercel deployment:

- **`vercel.json`**: Vercel configuration for SPA routing
- **`.vercelignore`**: Files to ignore during deployment
- **`package.json`**: Updated with vercel-build script

## 🚦 Automatic Deployments

Once connected to your git repository:

- **Production deployments**: Triggered by pushes to your main/master branch
- **Preview deployments**: Triggered by pushes to other branches or pull requests

## 🔍 Troubleshooting

### Common Issues:

1. **Build fails with environment variables error:**
   - Ensure all required environment variables are set in Vercel dashboard
   - Check that variable names start with `VITE_` for Vite to expose them

2. **404 errors on page refresh:**
   - The `vercel.json` file should handle SPA routing automatically
   - Verify the file exists and has correct configuration

3. **Supabase connection issues:**
   - Verify your Supabase project is active
   - Check that RLS policies are properly configured
   - Ensure your domain is added to Supabase allowed origins (if applicable)

4. **Build performance:**
   - Large projects may exceed Vercel's build time limits on free plan
   - Consider upgrading to Pro plan for larger applications

### Debug Steps:

1. **Check build logs:**
   - Go to your Vercel project dashboard
   - Click on a deployment to see detailed logs

2. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Verify environment variables:**
   ```bash
   vercel env ls
   ```

## 📈 Performance Optimization

- Static assets are automatically optimized by Vercel
- Consider implementing code splitting for larger applications
- Use Vercel Analytics to monitor performance

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/build.html)
- [Supabase Documentation](https://supabase.com/docs)

---

Your Task Board app is now ready for Vercel deployment! 🎉