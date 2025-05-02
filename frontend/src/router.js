import { createRouter, createWebHistory } from 'vue-router';

import TaskList from './components/TaskList.vue';
import LearningGoals from './components/LearningGoals.vue';
import Notes from './components/Notes.vue';
import ProgressTracker from './components/ProgressTracker.vue';
import StudyTimetable from './components/StudyTimetable.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Profile from './components/auth/Profile.vue';

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/tasks', component: TaskList, meta: { requiresAuth: true } },
  { path: '/goals', component: LearningGoals, meta: { requiresAuth: true } },
  { path: '/notes', component: Notes, meta: { requiresAuth: true } },
  { path: '/progress', component: ProgressTracker, meta: { requiresAuth: true } },
  { path: '/timetable', component: StudyTimetable, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global route guard to protect routes
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // If the user is not logged in (use localStorage or a global state for user)
    if (!localStorage.getItem('user')) {
      next('/login'); // Redirect to login if not authenticated
    } else {
      next(); // Proceed to the route if authenticated
    }
  } else {
    next(); // Proceed for routes that don't require authentication
  }
});

export default router;
