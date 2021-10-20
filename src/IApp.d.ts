import { Granularities } from "./enums";
export interface City {
  id: number;
  name: string;
  coord: { lon: number; lat: number };
}
export interface Forecast {
  date: date;
  formattedDate: string;
  temp: number;
}

export interface AllForecasts {
  // [granularity in Object.keys(Granularities)]: Forecast[];
  DAILY: Forecast[];
  HOURLY: Forecast[];
  CURRENT: CurrentForecast;
}

export interface CurrentForecast {
  date: date;
  formattedDate: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  sunrise: date;
  sunset: date;
}
