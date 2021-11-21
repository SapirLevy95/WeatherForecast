import "./App.css";
import CitySearchForm from "./components/citySearchForm/CitySearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import { StyledApp } from "./AppStyles";

const App = () => {
  const [city, setCity] = useState<City>();

  const changeCity = (city: City) => {
    setCity(city);
  };

  return (
    <StyledApp>
      <h1 className="main-title">Weather Forecast</h1>
      <CitySearchForm onCityChange={changeCity}></CitySearchForm>
      <div>{city && <WeatherInfo city={city} />}</div>
    </StyledApp>
  );
};

export default App;
