import { FC, useState } from "react";
import CITIES from "../../data/city.list.json";
import Input from "@reactmaker/react-autocorrect-input";
import { getCityFromAPI } from "../../services/openWeatherService";
import LocationIcon from "../../icons/locationIcon.png";
import Spinner from "react-spinner-material";
import { StyledCitySearchFrom } from "./CitySearchFormStyle";

const CitiesTemp: any = CITIES;
const CITIES_NAMES = CitiesTemp.map((city: City) => city.name);

const CitySearchForm: FC<{
  onCityChange: (city: City) => void;
}> = ({ onCityChange }) => {
  const [cityText, setCityText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCityFromCoordinates = async () => {
    const onCityRecived = (city: City) => {
      setCityText(city.name);
      onCityChange(city);
      setIsLoading(false);
    };
    setIsLoading(true);
    getCityFromAPI(onCityRecived);
  };

  const hendleCityChange = (value: string) => {
    const city = CitiesTemp.find(
      (item: City) => value.toLowerCase() === item.name.toLowerCase()
    );
    onCityChange(city ?? city);
    setCityText(value);
  };

  return (
    <StyledCitySearchFrom>
      <Input
        className="input-city"
        onChange={hendleCityChange}
        value={cityText}
        dataSource={CITIES_NAMES}
      />
      <button className="find-location-button" onClick={getCityFromCoordinates}>
        {!isLoading ? (
          <img className="location-icon" src={LocationIcon} alt="Logo" />
        ) : (
          <Spinner radius={30} color={"gray"} stroke={4} visible={true} />
        )}
      </button>
    </StyledCitySearchFrom>
  );
};

export default CitySearchForm;
