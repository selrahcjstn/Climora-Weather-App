export async function fetchWeatherData(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
  return await res.json()
}