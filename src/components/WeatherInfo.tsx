// import { Form } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
/* @ts-ignore */
import { Ring } from "react-awesome-spinners";
import { Animation, ScatterSeries } from "@devexpress/dx-react-chart";
import moment from "moment";
import * as React from "react";
/* @ts-ignore */
import Paper from "@material-ui/core/Paper";
import { fetchCityDataApi } from "../services/openWeatherService";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { curveCatmullRom, line } from "d3-shape";
import { City, Forecast } from "../IApp";

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

  const curvedLineSeries = (props: any) => (
    <LineSeries.Path
      {...props}
      path={line()
        .x((values: any) => values.arg)
        .y((values: any) => values.val)
        .curve(curveCatmullRom)}
    />
  );

  return (
    <div style={{ marginLeft: 50, marginRight: 50 }}>
      <h2 style={{ marginBottom: 10 }}>{city.name}</h2>
      {forecasts ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 50,
          }}
        >
          <Paper style={{ flexGrow: 1 }}>
            <Chart data={forecasts}>
              <ArgumentAxis />
              <ValueAxis />
              <LineSeries
                valueField="temp"
                argumentField="formattedDate"
                seriesComponent={curvedLineSeries}
              />
              <ScatterSeries
                color="blue"
                valueField="temp"
                argumentField="formattedDate"
              />
              <Animation />
            </Chart>
          </Paper>
          <h4 style={{ flexGrow: 1, border: "1px solid #ccc" }}>table</h4>
        </div>
      ) : (
        <Ring />
      )}
    </div>
  );
};
export default WeatherInfo;
