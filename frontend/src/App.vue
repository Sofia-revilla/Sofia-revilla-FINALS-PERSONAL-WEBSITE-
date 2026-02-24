<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// Import your original logic
import './styles/design.css';
import './styles/gallery.css';

const isLocked = ref(true);
const projects = ref([]);
const isDark = ref(false);

// REST API: GET Projects
const loadProjects = async () => {
  const res = await axios.get('https://your-backend.vercel.app/api/projects');
  projects.value = res.data;
};

// Enter Profile (Slot Machine Logic)
const unlock = () => {
  isLocked.value = false;
  document.body.classList.remove('locked');
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-mode');
};

onMounted(() => {
  loadProjects();
});
</script>

<template>
  <div v-if="isLocked" id="welcome-screen">
    <div class="slot-machine-container">
      <div class="slot-window">
        <div class="slot-reel">H</div><div class="slot-reel">E</div>
        <div class="slot-reel">L</div><div class="slot-reel">L</div><div class="slot-reel">O</div>
      </div>
      <button id="enter-btn" @click="unlock">ENTER PROFILE</button>
    </div>
  </div>

  <div v-else class="app-container">
    <nav class="nav-bar">
      <div class="icon-box" @click="toggleTheme">
        <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
      </div>
      <div class="nav-menu"><span>{{ isDark ? 'STEALTH MODE' : 'ACTIVE PROFILE' }}</span></div>
    </nav>

    <header class="hero-banner">
      <div class="hero-text">
        <h1>Ma. Sofia Anne</h1>
        <p>Cybersecurity & Forensics @ APC</p>
      </div>
      <div class="hero-img-wrapper">
         <img src="./assets/me.png" v-show="!isDark" class="char-light">
         <img src="./assets/mesleep.png" v-show="isDark" class="char-dark">
      </div>
    </header>

    <section class="projects-grid">
      <div v-for="p in projects" :key="p.id" class="project-card">
        <div class="p-icon"><i :class="p.icon"></i></div>
        <h3>{{ p.title }}</h3>
        <p>{{ p.description }}</p>
      </div>
    </section>
  </div>
</template>