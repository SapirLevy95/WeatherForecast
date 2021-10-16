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
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h1 style={{ marginTop: 10, textAlign: "center", marginBottom: 0 }}>
        Weather Forecast
      </h1>
      <CitySearchForm onCityChange={changeCity}></CitySearchForm>
      <div>{city && <WeatherInfo city={city} />}</div>
    </div>
  );
};

export default App;
