<!-- components/Header.vue -->
<template>
    <div class="navbar">
      <router-link to="/tasks">✅ Tasks</router-link>
      <router-link to="/goals">📚 Goals</router-link>
      <router-link to="/notes">🧠 Notes</router-link>
      <router-link to="/progress">📈 Progress</router-link>
      <router-link to="/timetable">📅 Timetable</router-link>
  
      <!-- Conditionally render based on authentication status -->
      <template v-if="isLoggedIn">
        <router-link to="/profile">👤 Profile</router-link>
        <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login">🔑 Login</router-link>
        <router-link to="/register">📝 Register</router-link>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoggedIn: !!localStorage.getItem('user') // Check if the user is logged in
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('user'); // Remove user data from localStorage
        this.isLoggedIn = false; // Update login state
        this.$router.push('/login'); // Redirect to login page
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #f0f0f0;
    padding: 1rem;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .navbar a {
    padding: 0.5rem 1rem;
    border: none;
    background: #333;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .navbar a.router-link-exact-active {
    background: #007bff;
  }
  </style>
  