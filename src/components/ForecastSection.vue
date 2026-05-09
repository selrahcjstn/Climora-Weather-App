<script setup>
import { computed } from 'vue'
import ForecastRow from './ForecastRow.vue'

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
      <ForecastRow 
        v-for="day in weeklyForecast" 
        :key="day.date"
        :day="formatDay(day.date)"
        :conditionText="day.day.condition.text"
        :maxTemp="day.day.maxtemp_c"
        :minTemp="day.day.mintemp_c"
      />
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

.empty-msg {
  font-size: 0.88rem;
  color: var(--color-muted);
  margin: 0;
}
</style>