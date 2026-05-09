<script setup>
import { ref, onMounted } from "vue";

import AppHeader from "@/components/AppHeader.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import ForecastSection from "@/components/ForecastSection.vue";
import HighlightSection from "@/components/HighlightSection.vue";
import { fetchWeatherData } from "@/services/weatherService.js";

const weatherData = ref(null);
const isLoading = ref(true);

const searchWeather = async (query) => {
  if (!query) return;

  isLoading.value = true;
  try {
    weatherData.value = await fetchWeatherData(query);
    console.log("Fetched Weather Data:", weatherData.value);
  } catch (err) {
    console.error("Failed to fetch weather:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        searchWeather(`${lat},${lon}`);
      },
      (error) => {
        console.warn("Geolocation error or denied:", error);
        searchWeather("London"); // Fallback city
      }
    );
  } else {
    searchWeather("London");
  }
});
</script>

<template>
  <div class="app-container">
    <AppHeader @search="searchWeather"/>
    <div v-if="isLoading" class="loader-container">
      <div class="spinner"></div>
      <p>Gathering atmosphere data...</p>
    </div>
    
    <main v-else class="main-layout">
      <div class="left-column">
        <WeatherCard :weather="weatherData" />
        <HighlightSection :weather="weatherData" />
      </div>
      <div class="right-column">
        <ForecastSection :weather="weatherData" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1.5rem;
  padding: 1rem;
  max-width: 100%;
  box-sizing: border-box;
}

.main-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-column {
  display: flex;
  flex-direction: column;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 1.5rem;
  padding: 2rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-accent, #8b5cf6);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loader-container p {
  color: var(--color-muted);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  animation: pulse 2s infinite ease-in-out;
  text-align: center;
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@media (min-width: 768px) {
  .app-container { padding: 1.5rem; }
}

@media (min-width: 1024px) {
  .app-container { padding: 2rem; }
  .main-layout { grid-template-columns: 2fr 1fr; }
}
</style>