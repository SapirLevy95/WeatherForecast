// import { Form } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";

import * as React from "react";
/* @ts-ignore */
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { json } from "stream/consumers";
import { City, Forecast } from "../IApp";

const fetchCityDataApi = async (city: City) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lon}&lon=${city.coord.lat}&units=metric&appid=3dfc3719046ab1bdb560adf66a6afffa`
  );
  const rawForecast = await response.json();
  const forecasts: Forecast[] = rawForecast.daily.map((day: any) => ({
    date: new Date(day.dt * 1000),
    dateDisplay: new Date(day.dt * 1000).toUTCString(),
    temp: day.temp.day,
  }));
  return forecasts;
};

const WeatherInfo: FunctionComponent<{
  city: City;
}> = ({ city }) => {
  const [forecasts, setForecasts] = useState<Forecast[] | undefined>();
  useEffect(() => {
    const fetchData = async () => setForecasts(await fetchCityDataApi(city));
    if (city) {
      fetchData();
    }
  }, [city]);

  console.log("forecasts!!", forecasts);
  return (
    <div>
      <h1>{city.name}</h1>
      <h1>{city.name}</h1>
      {forecasts ? (
        <Paper>
          <Chart data={forecasts}>
            <ArgumentAxis />
            <ValueAxis />
            <LineSeries valueField="temp" argumentField="dateDisplay" />
          </Chart>
        </Paper>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};
export default WeatherInfo;
