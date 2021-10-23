import { FunctionComponent } from "react";
import { Granularities } from "../enums";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WeatherGraph from "./WeatherGraph";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";

const StyledWeatherTabs = styled.div`
  flex: 1;
`;

export const WeatherGraphTabs: FunctionComponent<{
  forecasts: AllForecasts;
}> = ({ forecasts }) => {
  return (
    <StyledWeatherTabs>
      <Tabs>
        <TabList>
          <Tab>Daily</Tab>
          <Tab>Hourly</Tab>
        </TabList>
        <TabPanel>
          <WeatherGraph
            forecasts={forecasts}
            granularity={Granularities.DAILY}
          ></WeatherGraph>
        </TabPanel>
        <TabPanel>
          <WeatherGraph
            forecasts={forecasts}
            granularity={Granularities.HOURLY}
          ></WeatherGraph>
        </TabPanel>
      </Tabs>
    </StyledWeatherTabs>
  );
};
export default WeatherGraphTabs;
