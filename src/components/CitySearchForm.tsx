import { Form } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
import Cities from "../data/city.list.json";
/* @ts-ignore */
import Input from "@reactmaker/react-autocorrect-input";
import { City } from "../IApp";
import { getCityFromAPI } from "../services/openWeatherService";
import LocationIcon from "../icons/locationIcon.png";
const CitiesTemp: any = Cities;
const CITIES: City[] = CitiesTemp.map((city: City) => city);
const CITIES_NAMES = CitiesTemp.map((city: City) => city.name);

const CitySearchForm: FunctionComponent<{
  onCityChange: (city: City | null) => void;
}> = ({ onCityChange }) => {
  const [cityText, setCityText] = useState<string>("");

  const getCityFromCoordinates = async () => {
    getCityFromAPI((city: City) => {
      setCityText(city.name);
      onCityChange(city);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        width: 200,
      }}
    >
      <Input
        style={{ borderTopLeftRadius: 80, borderBottomLeftRadius: 80 }}
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
      <button
        style={{
          borderTopRightRadius: 80,
          borderBottomRightRadius: 80,
          background: "transparent",
          paddingRight: 4,
          paddingLeft: 2,
          border: "1px solid #ccc",
        }}
        onClick={getCityFromCoordinates}
      >
        <img style={{ height: 30, width: 30 }} src={LocationIcon} alt="Logo" />
      </button>
    </div>
  );
};

export default CitySearchForm;
