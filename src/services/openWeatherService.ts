import { City, Forecast } from "../IApp";
import moment from "moment";

export const fetchCityDataApi = async (city: City) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lon}&lon=${city.coord.lat}&units=metric&appid=3dfc3719046ab1bdb560adf66a6afffa`
  );
  const rawForecast = await response.json();
  const forecasts: Forecast[] = rawForecast.daily.map((day: any) => ({
    date: new Date(day.dt * 1000),
    formattedDate: moment(new Date(day.dt * 1000)).format("MMM Do YY"),
    temp: day.temp.day,
  }));
  return forecasts;
};

export const getCityFromAPI = (onCityRecived: (city: City) => void) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3dfc3719046ab1bdb560adf66a6afffa`
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
};
