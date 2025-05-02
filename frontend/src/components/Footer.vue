<!-- src/components/Footer.vue -->
<template>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 StudyBoard. All rights reserved.</p>
        <div class="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
    margin-top: 2rem;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-links {
    margin-top: 1rem;
  }
  
  .footer-links a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    font-size: 1rem;
  }
  
  .footer-links a:hover {
    text-decoration: underline;
  }
  </style>
  