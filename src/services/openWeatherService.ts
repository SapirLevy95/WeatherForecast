import { Granularities } from "../enums";
import {
  fetchCurrentWeatherDataApi,
  fetchOneCallApi,
} from "./getApiDataService";
import {
  getFullDate,
  getFullDateFormat,
  getFullDateWithTime,
  getHourFormat,
} from "../utilities";

export const fetchCityDataApi = async (city: City) => {
  const response = await fetchOneCallApi(city.coord.lon, city.coord.lat);
  const rawForecast = await response.json();
  return {
    [Granularities.DAILY]: rawForecast.daily.map((day: any) => ({
      date: getFullDate(day.dt),
      formattedDate: getFullDateFormat(day.dt),
      temp: day.temp.day,
    })),
    [Granularities.HOURLY]: rawForecast.hourly.map((hour: any) => ({
      date: getFullDate(hour.dt),
      formattedDate: getFullDateWithTime(hour.dt),
      temp: hour.temp,
    })),
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
};

export const getCityFromAPI = (onCityRecived: (city: City) => void) => {
  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude: lat, longitude: long } = position.coords;
      const response = await fetchCurrentWeatherDataApi(long, lat);
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
