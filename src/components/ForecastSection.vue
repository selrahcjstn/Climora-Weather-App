<script setup>
import { computed } from 'vue'
import { getIconForCondition } from '@/utils/iconMap.js'

const props = defineProps({
  weather: { type: Object, default: null }
})

const weeklyForecast = computed(() => {
  if (!props.weather || !props.weather.forecast) return []
  return props.weather.forecast.forecastday
})

const formatDay = (dateStr) => {
  const date = new Date(dateStr)
  const today = new Date()
  if (date.toDateString() === today.toDateString()) return 'Today'
  return date.toLocaleDateString([], { weekday: 'short' })
}
</script>

<template>
  <div class="forecast-container" v-if="weather && weather.forecast">
    <h2 class="label">7-Day Forecast</h2>
    <div class="forecast-list">
      <div class="forecast-row" v-for="day in weeklyForecast" :key="day.date">
        <span class="day">{{ formatDay(day.date) }}</span>
        <img
          class="weather-icon"
          :src="getIconForCondition(day.day.condition.text, 1)"
          :alt="day.day.condition.text"
        />
        <span class="condition">{{ day.day.condition.text }}</span>
        <span class="temps">
          <strong>{{ Math.round(day.day.maxtemp_c) }}</strong>
          <span class="low">/{{ Math.round(day.day.mintemp_c) }}</span>
        </span>
      </div>
    </div>
  </div>
  <div class="forecast-container empty" v-else>
    <p class="label">7-Day Forecast</p>
    <p class="empty-msg">Search for a city to see the forecast.</p>
  </div>
</template>

<style scoped>
.forecast-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid var(--color-border);
}

.label {
  font-size: 1.2rem;
  font-weight: 600;
}

.forecast-list {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.forecast-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  border-bottom: 1px solid var(--color-border);
  padding: 0 4px;
}

.forecast-row:last-child {
  border-bottom: none;
}

.day {
  font-size: 0.88rem;
  color: var(--color-muted);
  min-width: 48px;
}

.weather-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.condition {
  font-size: 0.88rem;
  color: var(--color-text);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.temps {
  font-size: 0.95rem;
  white-space: nowrap;
}

.temps strong {
  color: var(--color-text);
  font-weight: 600;
}

.temps .low {
  color: var(--color-muted);
  font-weight: 400;
  font-size: 0.85rem;
}

.empty-msg {
  font-size: 0.88rem;
  color: var(--color-muted);
  margin: 0;
}
</style>