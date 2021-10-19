import { Granularities } from "./enums";

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "@reactmaker/react-autocorrect-input" {
  const value: any;
  export default value;
}
declare module "@material-ui/core/Paper" {
  const value: any;
  export default value;
}

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
