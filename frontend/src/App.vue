<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 1. IMPORT IMAGES (This tells Vite exactly where they are)
// Make sure these files exist in frontend/src/assets/
import meLogo from './assets/me.png';
import meSleepLogo from './assets/mesleep.png';

const isLocked = ref(true);
const isDark = ref(false);
const projects = ref([]);

const fetchProjects = async () => {
  try {
    // Replace with your real Vercel backend URL later
    const res = await axios.get('http://localhost:3000/api/projects');
    projects.value = res.data;
  } catch (err) {
    console.error("API Error:", err);
  }
};

const unlockProfile = () => {
  isLocked.value = false;
  document.body.classList.remove('locked');
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-mode');
};

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <div :class="{ 'dark-mode': isDark }">
    <section v-if="isLocked" id="welcome-screen">
      <div class="slot-machine-container">
        <div class="slot-window">
          <div class="slot-reel">H</div><div class="slot-reel">E</div>
          <div class="slot-reel">L</div><div class="slot-reel">L</div><div class="slot-reel">O</div>
        </div>
        <button id="enter-btn" @click="unlockProfile">ENTER PROFILE</button>
      </div>
    </section>

    <div v-else class="app-container">
      <nav class="nav-bar">
        <div class="icon-box" @click="toggleTheme">
          <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
        </div>
      </nav>

      <section class="hero-banner">
        <div class="hero-text">
          <h1>Ma. Sofia Anne</h1>
        </div>
        <div class="hero-img-wrapper">
          <img :src="meLogo" v-show="!isDark" class="char-light">
          <img :src="meSleepLogo" v-show="isDark" class="char-dark">
        </div>
      </section>

      <div class="projects-grid">
        <div v-for="p in projects" :key="p.id" class="project-card">
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure these paths are correct relative to App.vue */
@import "./styles/design.css";
@import "./styles/gallery.css";

.char-dark { display: block !important; opacity: 1 !important; }
</style>