import { FunctionComponent, useEffect, useState } from "react";
import { fetchCityDataApi } from "../services/openWeatherService";
import WeatherGraphTabs from "./WeatherGraphTabs";
import CurrentWeatherTable from "./CurrentWeatherTable";
import Spinner from "react-spinner-material";
import styled from "styled-components";

const StyledWeatherInfo = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  & .city-title {
    margin-bottom: 10px;
  }
  & .weather-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
  }
`;

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
    <StyledWeatherInfo>
      <h2 className="city-title">{city.name}</h2>
      {forecasts ? (
        <div className="weather-container">
          <WeatherGraphTabs forecasts={forecasts} />
          <CurrentWeatherTable currentForecast={forecasts.CURRENT} />
        </div>
      ) : isLoading ? (
        <Spinner radius={30} color={"gray"} stroke={4} visible={true} />
      ) : (
        <h1>No data</h1>
      )}
    </StyledWeatherInfo>
  );
};
export default WeatherInfo;
