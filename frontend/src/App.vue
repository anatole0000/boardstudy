<template>
  <div>
    <!-- Include the Header component -->
    <Header />

    <!-- Main view container -->
    <div class="view-container">
      <router-view />
    </div>

    <!-- Add Footer here -->
    <Footer />
  </div>
</template>

<script>
// Import the Header and Footer components
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
.view-container {
  padding: 1rem;
  min-height: 70vh; /* Ensure there's space for the footer */
}

footer {
  margin-top: auto;
}
</style>
