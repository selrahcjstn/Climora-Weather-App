<template>
  <footer class="app-footer">
    <div class="footer-left">
      <p>&copy; {{ new Date().getFullYear() }} Climora. All rights reserved.</p>
      <p class="developer">Developed by <a href="https://github.com/selrahcjstn" target="_blank" rel="noopener noreferrer">@selrahcjstn</a></p>
    </div>
    <div class="footer-right">
      <p>Powered by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">WeatherAPI.com</a></p>
    </div>
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

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.developer {
  font-weight: 500;
  color: var(--color-text);
  font-size: 0.8rem;
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
    align-items: center;
    padding: 1.5rem 2rem;
    text-align: left;
  }
  
  .footer-right {
    text-align: right;
  }
}
</style>
