<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 1. Reactive State
const isLocked = ref(true);
const isDark = ref(false);
const projects = ref([]);

// 2. GET Method: Fetch from your Vercel Backend
const fetchProjects = async () => {
  try {
    // REPLACE with your actual Backend Vercel URL
    const res = await axios.get('https://your-backend-url.vercel.app/api/projects');
    projects.value = res.data;
  } catch (err) {
    console.error("API Error:", err);
  }
};

// 3. Interactions
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
          <div class="slot-reel">H</div>
          <div class="slot-reel">E</div>
          <div class="slot-reel">L</div>
          <div class="slot-reel">L</div>
          <div class="slot-reel">O</div>
        </div>
        <div class="slot-sub" style="opacity: 1;">THERE</div>
        <button id="enter-btn" style="opacity: 1; pointer-events: auto;" @click="unlockProfile">
          ENTER PROFILE
        </button>
      </div>
    </section>

    <div v-else class="app-container">
      <nav class="nav-bar">
        <div class="nav-left-icons">
          <div class="icon-box" @click="toggleTheme">
            <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
          </div>
        </div>
        <div class="nav-menu"><span class="active">BSCS-SF Student Profile</span></div>
        <div class="nav-auth-buttons">
          <button class="btn-pill btn-outline">Contact Me</button>
        </div>
      </nav>

      <section class="hero-banner" id="hero">
        <div class="hero-text">
          <h1>Ma. Sofia Anne</h1>
          <p><strong>Future Military Cyber Specialist</strong><br>
          "Practicality over passion, but passion always finds a way."</p>
        </div>
        <div class="hero-img-wrapper">
          <img src="/me.png" v-show="!isDark" alt="Active" class="char-light">
          <img src="/mesleep.png" v-show="isDark" alt="Sleeping" class="char-dark">
        </div>
      </section>

      <div class="section-header">Projects</div>
      <div class="projects-grid">
        <div v-for="p in projects" :key="p.id" class="project-card">
          <div class="p-icon"><i :class="p.icon"></i></div>
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Import your original styles */
@import "./styles/design.css";
@import "./styles/gallery.css";

/* Ensure dark mode images work with Vue v-show */
.char-dark {
  display: block !important;
  opacity: 1 !important;
}
</style>