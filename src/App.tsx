import "./App.css";
// import axios from "axios";
import CitySearchForm from "./components/CitySearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import { City } from "./IApp";

const App = () => {
  const [city, setCity] = useState<City | null>(null);

  const changeCity = (city: City | null) => {
    setCity(city);
    console.log("city name in app", city);
  };

  return (
    <div>
      <CitySearchForm onCityChange={changeCity}></CitySearchForm>
      {city && <WeatherInfo city={city} />}
    </div>
  );
};

export default App;
