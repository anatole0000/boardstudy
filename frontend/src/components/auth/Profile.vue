<template>
    <div class="profile-container" v-if="user">
      <div class="profile-header">
        <h2>Welcome, {{ user.username }}!</h2>
        <p class="email">{{ user.email }}</p>
      </div>
  
      <div class="profile-body">
        <p>Your account is ready.</p>
        <div v-if="user.avatar">
          <img :src="user.avatar" alt="Profile Picture" class="profile-image" />
        </div>
      </div>
  
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import api from '../../api';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    async created() {
      try {
        const res = await api.get('/auth/me');
        this.user = res.data;
      } catch (error) {
        this.$router.push('/login');
      }
    },
    methods: {
      async logout() {
        await api.post('/auth/logout');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 450px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .profile-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .profile-header {
    margin-bottom: 1.5rem;
  }
  
  .profile-header h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .email {
    font-size: 1rem;
    color: #888;
  }
  
  .profile-body {
    margin-bottom: 2rem;
  }
  
  .profile-image {
    max-width: 120px;
    max-height: 120px;
    border-radius: 50%;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .logout-btn {
    padding: 0.8rem;
    width: 100%;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .logout-btn:hover {
    background-color: #e53935;
  }
  
  @media (max-width: 600px) {
    .profile-container {
      padding: 1.5rem;
    }
  
    .profile-header h2 {
      font-size: 1.25rem;
    }
  
    .email {
      font-size: 0.9rem;
    }
  
    .logout-btn {
      padding: 0.7rem;
    }
  }
  </style>
  