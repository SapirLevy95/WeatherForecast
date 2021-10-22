import { FunctionComponent, useEffect, useState } from "react";
import { fetchCityDataApi } from "../services/openWeatherService";
import { Granularities } from "../enums";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GraphComponent from "./GraphComponent";
import TableComponent from "./TableComponent";
import Spinner from "react-spinner-material";

const WeatherInfo: FunctionComponent<{ city: City }> = ({ city }) => {
  const [forecasts, setForecasts] = useState<AllForecasts | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchData = async () => {
    try {
      setForecasts(await fetchCityDataApi(city));
    } catch (error) {
      setForecasts(null);
      console.error("no data was fetched from the API call");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (city) {
      setIsLoading(true);
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
      ) : isLoading ? (
        <Spinner radius={30} color={"gray"} stroke={4} visible={true} />
      ) : (
        <h1>No data</h1>
      )}
    </div>
  );
};
export default WeatherInfo;
