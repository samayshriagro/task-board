# Task Management Web App

A modern, responsive task management application built with React, Vite, and Tailwind CSS. Features a kanban-style board with drag-and-drop functionality for efficient task organization.

## 🚀 Features

### Core Functionality
- **Five-Column Kanban Board**: To-Do, Work in Progress, Blocked, Completed, Done
- **Drag & Drop**: Smooth task movement between columns
- **Task Management**: Create, edit, and delete tasks
- **Persistent Storage**: Data saved to localStorage
- **Mobile-First Design**: Fully responsive across all devices

### Task Details
- Title and description
- Start and end dates
- Priority levels (Low, Medium, High) with color coding
- Task owner assignment
- Comments system with timestamps
- Task count per column

### Advanced Features
- **Search & Filter**: Find tasks by title, description, priority, or owner
- **Dark Mode**: Toggle between light and dark themes
- **Date Validation**: End date must be after start date
- **Smooth Animations**: Polished transitions and interactions
- **Touch Support**: Works perfectly on mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v3
- **State Management**: Zustand with persistence
- **Drag & Drop**: @dnd-kit/core
- **Icons**: Lucide React
- **Backend (Optional)**: Supabase for real-time data sync
- **Build Tool**: Vite

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🗄️ Supabase Integration (Optional)

For persistent cloud storage and real-time synchronization:

1. **Quick Setup:**
   ```bash
   ./setup-supabase.sh
   ```

2. **Configure Supabase:**
   - Create a project at [supabase.com](https://supabase.com)
   - Update `.env` with your credentials
   - Run SQL scripts to set up database

3. **See detailed instructions:**
   - [📖 Full Supabase Setup Guide](SUPABASE.md)
   - Includes database schema, sample data, and API documentation

## 🎯 Usage

### Getting Started
- The app loads with sample data to demonstrate functionality
- Click "Create Task" to add new tasks
- Drag tasks between columns to change their status
- Use search and filters to find specific tasks

### Creating Tasks
1. Click the "Create Task" button in the header
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Start and end dates
   - Priority level
   - Owner name (required)
3. Click "Create Task" to save

### Managing Tasks
- **Edit**: Click the edit icon on any task card (desktop) or use the mobile actions menu
- **Delete**: Click the trash icon (requires confirmation) or use mobile actions menu
- **Move**: Drag tasks between columns (desktop) or use the mobile actions menu
- **Comment**: Click the comments section to add notes

### Mobile Navigation
- **Tab Interface**: Switch between task stages using tabs (no horizontal scrolling)
- **Floating Action Button**: Quick task creation via the + button in bottom-right
- **Mobile Actions Menu**: Three-dot menu on each task for move, edit, and delete actions

### Search & Filter
- **Search**: Type in the search box to find tasks by title or description
- **Priority Filter**: Select a priority level to filter tasks
- **Owner Filter**: Type an owner name to filter tasks
- **Clear Filters**: Click the "Clear" button to reset all filters

## 📱 Mobile Experience

The app is built mobile-first with:
- **Tab Navigation**: Clean tab interface on mobile to avoid horizontal scrolling
- **Touch-friendly drag and drop**: Optimized for touch devices
- **Mobile task actions**: Context menu for moving, editing, and deleting tasks
- **Floating Action Button**: Easy task creation on mobile devices
- **Responsive design**: Adapts seamlessly between mobile and desktop
- **Optimized tap targets**: Comfortable finger-friendly interface

## 🎨 Design System

### Colors
- **Primary**: Blue shades for interactive elements
- **Priority Levels**:
  - Low: Green
  - Medium: Yellow/Orange
  - High: Red
- **Dark Mode**: Automatic theme switching

### Components
- Cards with subtle shadows and hover effects
- Rounded corners for modern appearance
- Consistent spacing and typography
- Smooth transitions for all interactions

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── TaskBoard.jsx   # Main board container
│   ├── TaskColumn.jsx  # Column for each stage
│   ├── TaskCard.jsx    # Individual task cards
│   ├── TaskModal.jsx   # Create/edit modal
│   ├── Header.jsx      # App header with controls
│   └── SearchAndFilter.jsx # Search and filter bar
├── store/              # State management
│   └── taskStore.js    # Zustand store
├── hooks/              # Custom hooks
│   └── useSampleData.js # Sample data loader
├── utils/              # Utility functions
│   └── dateUtils.js    # Date formatting helpers
└── index.css           # Tailwind styles
```

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Future Enhancements

- Backend integration with REST API
- User authentication and multi-user support
- Real-time collaboration
- Task dependencies and subtasks
- File attachments
- Email notifications
- Advanced reporting and analytics

---

Built with ❤️ using React, Vite, and Tailwind CSS
