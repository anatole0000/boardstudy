# Task Management & Study App

## Overview

This is a **Study Task Management & Learning App** built with **Express.js**, **Vue.js**, **MongoDB**, and **Vite**. The app allows users to manage their study tasks, track progress, and organize their learning goals. With the AI feature integrated, tasks are automatically prioritized based on their description. The app includes features like:

- **Task List**: Users can create tasks, mark them as completed, and delete them.
- **Notes/Concepts**: Users can save important concepts or notes related to their learning goals.
- **Progress Tracker**: Visualize the completion of tasks with a progress chart.
- **Study Timetable**: Plan study sessions and track your study progress over time.

## Features

### 📚 Learning Goals
- Set specific learning goals and objectives for your study sessions.
- Track progress against your goals and adjust your study plans accordingly.

### ✅ Task List / Study To-Do
- Add study-related tasks to a to-do list.
- Mark tasks as completed, and filter tasks by status.
- Automatically categorize tasks by priority (High/Normal) using AI.

### 🧠 Notes or Concepts
- Add and save important notes or concepts.
- Organize concepts related to specific topics or courses.
  
### 📈 Progress Tracker
- Visualize your task completion progress.
- Display the number of tasks completed versus total tasks.
  
### 📅 Study Timetable
- Plan your study timetable.
- Schedule and track study sessions based on priority.

## Tech Stack

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for storing tasks, notes, and study timetable)
- **Frontend**:
  - Vue.js
  - Vite (for fast development)
- **AI**:
  - Custom AI for task priority estimation based on keywords like "urgent", "important", and more.
  
## Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (for running both backend and frontend)
- **MongoDB** (either running locally or use MongoDB Atlas for a cloud database)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/study-task-manager.git
   cd study-task-manager
