import dayIcon from '@/assets/icons/day.svg';
import nightIcon from '@/assets/icons/night.svg';
import cloudyDayIcon from '@/assets/icons/cloudy-day-1.svg';
import cloudyNightIcon from '@/assets/icons/cloudy-night-1.svg';
import cloudyIcon from '@/assets/icons/cloudy.svg';
import rainyIcon from '@/assets/icons/rainy-6.svg';
import thunderIcon from '@/assets/icons/thunder.svg';
import snowyIcon from '@/assets/icons/snowy-6.svg';

export const getIconForCondition = (conditionText, isDay = 1) => {
  if (!conditionText) return isDay ? dayIcon : nightIcon;
  const text = conditionText.toLowerCase();
  
  if (text.includes('sunny')) return dayIcon;
  if (text.includes('clear')) return isDay ? dayIcon : nightIcon;
  if (text.includes('partly cloudy')) return isDay ? cloudyDayIcon : cloudyNightIcon;
  if (text.includes('cloud') || text.includes('overcast') || text.includes('mist') || text.includes('fog')) return cloudyIcon;
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return rainyIcon;
  if (text.includes('thunder') || text.includes('storm')) return thunderIcon;
  if (text.includes('snow') || text.includes('ice') || text.includes('blizzard') || text.includes('sleet') || text.includes('pellets')) return snowyIcon;
  
  return isDay ? dayIcon : nightIcon;
};
