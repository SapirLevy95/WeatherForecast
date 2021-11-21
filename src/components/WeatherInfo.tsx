import { FunctionComponent, useEffect, useState } from "react";
import { fetchCityDataApi } from "../services/openWeatherService";
import WeatherGraphTabs from "./WeatherGraphTabs";
import CurrentWeatherTable from "./CurrentWeatherTable";
import Spinner from "react-spinner-material";
import { StyledWeatherInfo } from "./weatherInfo/WeatherInfoStyles";

const WeatherInfo: FunctionComponent<{ city: City }> = ({ city }) => {
  const [forecasts, setForecasts] = useState<AllForecasts | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
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
    if (city) {
      setIsLoading(true);
      fetchData();
    }
  }, [city]);

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
