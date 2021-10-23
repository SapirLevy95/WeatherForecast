declare module "@reactmaker/react-autocorrect-input" {
  export default any;
}

interface City {
  id: number;
  name: string;
  coord: { lon: number; lat: number };
}
interface Forecast {
  date: date;
  formattedDate: string;
  temp: number;
}

interface AllForecasts {
  DAILY: Forecast[];
  HOURLY: Forecast[];
  CURRENT: CurrentForecast;
}

interface CurrentForecast {
  date: date;
  formattedDate: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  sunrise: date;
  sunset: date;
}
