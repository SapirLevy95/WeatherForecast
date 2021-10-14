import { Form } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
import Cities from "../data/city.list.json";
/* @ts-ignore */
import Input from "@reactmaker/react-autocorrect-input";
import { City } from "../IApp";

const CitiesTemp: any = Cities;
const CITIES: City[] = CitiesTemp.map((city: City) => city);
const CITIES_NAMES = CitiesTemp.map((city: City) => city.name);

const getCountryFromAPI = (onCityRecived: (city: City) => void) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3dfc3719046ab1bdb560adf66a6afffa`
    );
    const rowData = await response.json();
    const city: City = {
      id: rowData.id,
      name: rowData.name,
      coord: {
        lon: rowData.coord.lon,
        lat: rowData.coord.lat,
      },
    };
    onCityRecived(city);
  });
};

const CitySearchForm: FunctionComponent<{
  onCityChange: (city: City | null) => void;
}> = ({ onCityChange }) => {
  const [cityText, setCityText] = useState<string>("");

  const getCityFromCoordinates = async () => {
    getCountryFromAPI((city: City) => {
      setCityText(city.name);
      onCityChange(city);
    });
  };

  return (
    <div className="flex-container">
      <button onClick={getCityFromCoordinates}> click </button>
      <Input
        onChange={(value: string) => {
          const city = CITIES.find(
            (item: City) => value.toLowerCase() === item.name.toLowerCase()
          );
          onCityChange(city ? city : null);
          setCityText(value);
        }}
        value={cityText}
        dataSource={CITIES_NAMES}
      />
    </div>
  );
};

export default CitySearchForm;
