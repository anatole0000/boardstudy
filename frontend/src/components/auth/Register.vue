<!-- src/components/auth/Register.vue -->
<template>
    <div class="auth-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </template>
  
  <script>
  import api from '../../api';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          await api.post('/auth/register', { username: this.username, password: this.password });
          this.$router.push('/login');
        } catch (error) {
          alert('Error registering!');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  form div {
    margin-bottom: 1rem;
  }
  form input {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.4rem;
  }
  button {
    padding: 0.8rem;
    width: 100%;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  </style>
  