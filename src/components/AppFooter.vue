<template>
  <footer class="app-footer">
    <p>&copy; {{ new Date().getFullYear() }} Climora. All rights reserved.</p>
    <p>Powered by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">WeatherAPI.com</a></p>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 0.85rem;
  text-align: center;
}

.app-footer a {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.app-footer a:hover {
  opacity: 0.8;
}

@media (min-width: 600px) {
  .app-footer {
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem 2rem;
  }
}
</style>
