<script setup>
import { ref } from "vue";
import { Icon } from '@iconify/vue';

const searchQuery = ref("");
const emit = defineEmits(["search"]);

const onSearchSubmit = () => {
  if (!searchQuery.value) return;
  emit("search", searchQuery.value);
};
</script>

<template>
  <header>
    <div class="brand">
      <h1 class="logo">Climora</h1>
      <p class="tagline">Smart weather insights</p>
    </div>
    <div class="search-container">
      <Icon icon="lucide:search" class="search-icon" />
      <input
        type="text"
        placeholder="Enter city name..."
        class="search-input"
        v-model="searchQuery"
        @keyup.enter="onSearchSubmit"
      />
    </div>
  </header>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.brand { display: flex; flex-direction: column; }

.logo {
  font-size: 1.6rem;
  margin-bottom: 0.1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.tagline {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.search-container {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  max-width: 300px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 60px;
  padding: 0 1rem;
  transition: border-color 0.3s ease;
}

.search-container:focus-within { border-color: var(--color-accent); }

.search-icon {
  font-size: 1rem;
  color: var(--color-muted);
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  min-width: 0;
  padding: 0.65rem 0.6rem;
  font-size: 0.9rem;
  border: none;
  background-color: transparent;
  color: var(--color-text);
}

.search-input:focus { outline: none; }

@media (max-width: 480px) {
  header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .search-container { max-width: 100%; }
  .logo { font-size: 1.8rem; }
}
</style>