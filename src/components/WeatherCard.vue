<script setup>
import { getIconForCondition } from '@/utils/iconMap.js'
import { Icon } from '@iconify/vue';

defineProps({
  weather: { type: Object, default: null },
})

function feelsLikeLabel(actual, feels) {
  if (feels > actual + 2) return 'Hotter than actual'
  if (feels < actual - 2) return 'Cooler than actual'
  return 'Similar to actual'
}
</script>

<template>
  <div v-if="weather && weather.forecast" class="card">
    
    <div class="card-inner">
      <div class="bg-icon">
        <img :src="getIconForCondition(weather.current.condition.text, weather.current.is_day)" :alt="weather.current.condition.text" />
      </div>

      <div class="loc-row">
        <div class="loc-dot"></div>
        <span class="loc-name">{{ weather.location.name }}, {{ weather.location.country }}</span>
      </div>

      <div class="temp-block">
        <div class="temp-main">
          <span class="temp-num">{{ weather.current.temp_c }}</span>
          <span class="temp-unit">°C</span>
        </div>
        
        <div class="condition-row">
          <span class="condition-text">{{ weather.current.condition.text }}</span>
        </div>

        <div class="feels-like-inline">
          <span class="feels-val">Feels like: {{ weather.current.feelslike_c }}°</span>
        </div>
      </div>

      <div class="card-footer">
        <div class="date-stack">
          <span class="date-day">{{ new Date(weather.location.localtime).toLocaleDateString('en-US', { weekday: 'long' }) }}</span>
          <span class="date-sub">{{ new Date(weather.location.localtime).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) }}</span>
        </div>

        <div class="rain-pill">
          <Icon icon="lucide:cloud-rain" class="rain-icon" />
          <div class="rain-info">
            <span class="rain-val">{{ weather.forecast.forecastday[0].day.daily_chance_of_rain }}% Rain</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>

  <div v-else class="card empty-card">
    <p class="empty-text">No weather data available. Please search for a city.</p>
  </div>
</template>
<style scoped>
.card {
  background: var(--color-surface, #1e1e24);
  border: 1px solid var(--color-border, #2d2d35);
  border-radius: 1.5rem;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-inner {
  position: relative;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(30, 24, 48, 0.9) 0%, rgba(24, 24, 31, 0.9) 80%);
  display: flex;
  flex-direction: column;
  min-height: 260px;
  flex: 1;
}

.bg-icon {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 100px;
  height: 100px;
  pointer-events: none;
  z-index: 1;
}

.bg-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4));
}

.loc-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.08);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  width: fit-content;
  max-width: calc(100% - 120px);
  z-index: 2;
}

.loc-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent, #8b5cf6);
  flex-shrink: 0;
}

.loc-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e2e2e9;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.temp-block {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  z-index: 2;
  position: relative;
}

.temp-main {
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;
  line-height: 1;
}

.temp-num {
  font-size: 4rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.04em;
}

.temp-unit {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  margin-top: 0.4rem;
}

.condition-row { margin-top: 0.6rem; }

.condition-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}

.feels-like-inline { margin-top: 0.4rem; }

.feels-val {
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 2;
  margin-top: auto;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.date-stack {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.date-day {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
}

.date-sub {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
}

.rain-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
}

.rain-icon { font-size: 1rem; color: #ffffff; }

.rain-val {
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
}

.empty-card {
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-text { font-size: 1rem; color: #a0a0a5; }

@media (min-width: 480px) {
  .card-inner { padding: 2rem; }
  .bg-icon { width: 130px; height: 130px; right: 1.5rem; top: 1.5rem; }
  .loc-row { max-width: calc(100% - 150px); }
  .temp-num { font-size: 5rem; }
  .temp-unit { font-size: 1.8rem; }
  .condition-text { font-size: 1.3rem; }
  .date-day { font-size: 1.2rem; }
}
</style>