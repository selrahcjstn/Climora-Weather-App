<script setup>
import { getIconForCondition } from '@/utils/iconMap.js'

defineProps({
  day: { type: String, required: true },
  conditionText: { type: String, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true }
})
</script>
<template>
  <div :class="['forecast-row', { 'is-today': day === 'Today' }]">
    <span :class="['day', { 'is-today-label': day === 'Today' }]">{{ day }}</span>
    <img
      class="weather-icon"
      :src="getIconForCondition(conditionText, 1)"
      :alt="conditionText"
    />
    <span class="condition">{{ conditionText }}</span>
    <span class="temps">
      <strong>{{ Math.round(maxTemp) }}</strong>
      <span class="low">/{{ Math.round(minTemp) }}</span>
    </span>
  </div>
</template>

<style scoped>
.forecast-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  border-bottom: 1px solid var(--color-border);
  padding: 0 10px;
  border-radius: 0.75rem;
  transition: background 0.2s;
}

.forecast-row:last-child {
  border-bottom: none;
}

.forecast-row.is-today {
  background-color: rgba(139, 92, 246, 0.08);
  border-bottom-color: transparent;
  outline: 1px solid rgba(139, 92, 246, 0.2);
}

.day {
  font-size: 0.88rem;
  color: var(--color-muted);
  min-width: 48px;
}

.day.is-today-label {
  color: var(--color-accent, #8b5cf6);
  font-weight: 700;
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
</style>