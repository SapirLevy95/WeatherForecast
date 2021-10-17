// import { Form } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
/* @ts-ignore */
import { Ring } from "react-awesome-spinners";
/* @ts-ignore */
import { fetchCityDataApi } from "../services/openWeatherService";
import { AllForecasts, City, Forecast } from "../IApp";
import { Granularities } from "../enums";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GraphComponent from "./GraphComponent";
import { colors } from "@material-ui/core";

const WeatherInfo: FunctionComponent<{
  city: City;
}> = ({ city }) => {
  const [forecasts, setForecasts] = useState<AllForecasts | undefined>();
  useEffect(() => {
    const fetchData = async () => setForecasts(await fetchCityDataApi(city));
    if (city) {
      fetchData();
    }
  }, [city]);

  console.log("forecasts", forecasts);
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
          <Tabs style={{ flex: 1 }}>
            <TabList>
              <Tab>Daily</Tab>
              <Tab>Hourly</Tab>
            </TabList>
            <TabPanel>
              <GraphComponent
                forecasts={forecasts}
                granularity={Granularities.DAILY}
              ></GraphComponent>
            </TabPanel>
            <TabPanel>
              <GraphComponent
                forecasts={forecasts}
                granularity={Granularities.HOURLY}
              ></GraphComponent>
            </TabPanel>
          </Tabs>
          <h4 style={{ flex: 1, border: "1px solid #ccc" }}>table</h4>
        </div>
      ) : (
        <Ring />
      )}
    </div>
  );
};
export default WeatherInfo;
