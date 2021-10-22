import { FunctionComponent, useEffect, useState } from "react";
import { fetchCityDataApi } from "../services/openWeatherService";
import { Granularities } from "../enums";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GraphComponent from "./GraphComponent";
import TableComponent from "./TableComponent";
import Spinner from "react-spinner-material";

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
          <TableComponent currentForecast={forecasts.CURRENT}></TableComponent>
        </div>
      ) : (
        <Spinner radius={30} color={"gray"} stroke={4} visible={true} />
      )}
    </div>
  );
};
export default WeatherInfo;
