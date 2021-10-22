import { Granularities } from "../enums";
import {
  getFullDate,
  getFullDateFormat,
  getFullDateWithTime,
  getHourFormat,
} from "../utilities";
const OPEN_WEATHER_APPID = "3dfc3719046ab1bdb560adf66a6afffa";

export const fetchCityDataApi = async (city: City) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lon}&lon=${city.coord.lat}&units=metric&appid=${OPEN_WEATHER_APPID}`
  );
  const rawForecast = await response.json();
  const dailyForecasts = {
    [Granularities.DAILY]: rawForecast.daily.map((day: any) => ({
      date: getFullDate(day.dt),
      formattedDate: getFullDateFormat(day.dt),
      temp: day.temp.day,
    })),
  };

  const hourlyForecasts = {
    [Granularities.HOURLY]: rawForecast.hourly.map((hour: any) => ({
      date: getFullDate(hour.dt),
      formattedDate: getFullDateWithTime(hour.dt),
      temp: hour.temp,
    })),
  };
  const currentForecast = {
    CURRENT: {
      date: getFullDate(rawForecast.current.dt),
      formattedDate: getFullDateFormat(rawForecast.current.dt),
      temp: rawForecast.current.temp,
      feelsLike: rawForecast.current.feels_like,
      humidity: rawForecast.current.humidity,
      sunrise: getHourFormat(rawForecast.current.sunrise),
      sunset: getHourFormat(rawForecast.current.sunset),
    },
  };
  const allForecasts = Object.assign(
    dailyForecasts,
    hourlyForecasts,
    currentForecast
  );
  return allForecasts;
};

export const getCityFromAPI = (onCityRecived: (city: City) => void) => {
  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OPEN_WEATHER_APPID}`
      );
      const rowData = await response.json();
      const city: City = {
        id: rowData.id,
        name: rowData.name,
        coord: {
          lon: rowData.coord.lon,
          lat: rowData.coord.lat,
        },
      };
      onCityRecived(city);
    });
  } catch (error) {
    console.error("couldn't get the geolocation");
  }
};
