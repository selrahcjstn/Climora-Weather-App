<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  weather: { type: Object, default: null },
})

const getHumidityStatus = (humidity) => {
  if (humidity <= 30) return 'Low';
  if (humidity <= 60) return 'Good';
  if (humidity <= 80) return 'High';
  return 'Very High';
};

const getUVStatus = (uv) => {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
};

const getVisibilityStatus = (vis) => {
  if (vis >= 10) return 'Good';
  if (vis >= 5) return 'Moderate';
  return 'Poor';
};
</script>

<template>
  <div class="highlight-section" v-if="weather && weather.current">
    <h2 class="section-title">Today's Highlights</h2>

    <div class="highlights-container">
      <div class="highlight-card">
        <div class="card-header">
          <Icon icon="lucide:wind" class="header-icon" />
          <span class="card-title">Wind</span>
        </div>
        <p class="card-value">{{ weather.current.wind_kph }} <span class="unit">km/h</span></p>
        <p class="card-subtext">{{ weather.current.wind_dir }}</p>
      </div>

      <div class="highlight-card">
        <div class="card-header">
          <Icon icon="lucide:droplets" class="header-icon" />
          <span class="card-title">Humidity</span>
        </div>
        <p class="card-value">{{ weather.current.humidity }} <span class="unit">%</span></p>
        <p class="card-subtext">{{ getHumidityStatus(weather.current.humidity) }}</p>
      </div>

      <div class="highlight-card">
        <div class="card-header">
          <Icon icon="lucide:sun" class="header-icon" />
          <span class="card-title">UV Index</span>
        </div>
        <p class="card-value">{{ weather.current.uv }}</p>
        <p class="card-subtext">{{ getUVStatus(weather.current.uv) }}</p>
      </div>

      <div class="highlight-card">
        <div class="card-header">
          <Icon icon="lucide:eye" class="header-icon" />
          <span class="card-title">Visibility</span>
        </div>
        <p class="card-value">{{ weather.current.vis_km }} <span class="unit">km</span></p>
        <p class="card-subtext">{{ getVisibilityStatus(weather.current.vis_km) }}</p>
      </div>

      <div class="highlight-card large-card sun-card">
        <div class="sun-item">
          <Icon icon="lucide:sunrise" class="sun-icon" />
          <div class="sun-text">
            <span class="sun-label">Sunrise</span>
            <p class="sun-time">{{ weather.forecast.forecastday[0].astro.sunrise }}</p>
          </div>
        </div>
        <div class="sun-divider"></div>
        <div class="sun-item">
          <Icon icon="lucide:sunset" class="sun-icon" />
          <div class="sun-text">
            <span class="sun-label">Sunset</span>
            <p class="sun-time">{{ weather.forecast.forecastday[0].astro.sunset }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="highlight-section empty" v-else>
    <h2 class="section-title">Today's Highlights</h2>
    <p class="empty-text">Search for a city to see weather highlights.</p>
  </div>
</template>
<style scoped>
.highlight-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-sizing: border-box;
}

.section-title {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin: 0;
}

.highlights-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.highlight-card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.large-card { grid-column: span 2; }

.sun-card {
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
}

.sun-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.sun-icon { font-size: 1.75rem; color: #fbbf24; flex-shrink: 0; }

.sun-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.sun-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.sun-time {
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
}

.sun-divider {
  width: 1px;
  height: 36px;
  background-color: var(--color-border);
  flex-shrink: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-muted);
}

.header-icon { font-size: 1rem; }

.card-title {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.card-value {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
}

.unit { font-size: 0.9rem; font-weight: 400; }

.card-subtext {
  font-size: 0.78rem;
  color: var(--color-muted);
  margin: 0;
}

.empty-text {
  font-size: 0.88rem;
  color: var(--color-muted);
  margin: 0;
}
</style>