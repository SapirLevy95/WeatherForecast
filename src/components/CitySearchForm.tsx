import { FunctionComponent, useState } from "react";
import CITIES from "../data/city.list.json";
import Input from "@reactmaker/react-autocorrect-input";
import { getCityFromAPI } from "../services/openWeatherService";
import LocationIcon from "../icons/locationIcon.png";
import styled from "styled-components";
import Spinner from "react-spinner-material";

const StyledCitySearchFrom = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 200px;

  & .input-city {
    border-top-left-radius: 80px;
    border-bottom-left-radius: 80px;
  }

  & button {
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    background: transparent;
    padding-right: 4px;
    padding-left: 2px;
    border: 1px solid #ccc;
  }
  & img {
    height: 30px;
    width: 30px;
  }
`;

const CitiesTemp: any = CITIES;
const CITIES_NAMES = CitiesTemp.map((city: City) => city.name);

const CitySearchForm: FunctionComponent<{
  onCityChange: (city: City | null) => void;
}> = ({ onCityChange }) => {
  const [cityText, setCityText] = useState<string>("");
  const [isCityChanges, setIsCityChanges] = useState<boolean>(false);

  const getCityFromCoordinates = async () => {
    const onCityRecived = (city: City) => {
      setCityText(city.name);
      onCityChange(city);
      setIsCityChanges(false);
    };
    setIsCityChanges(true);
    getCityFromAPI(onCityRecived);
  };

  return (
    <StyledCitySearchFrom>
      <Input
        className="input-city"
        onChange={(value: string) => {
          const city = CitiesTemp.find(
            (item: City) => value.toLowerCase() === item.name.toLowerCase()
          );
          onCityChange(city ? city : null);
          setCityText(value);
        }}
        value={cityText}
        dataSource={CITIES_NAMES}
      />
      <button onClick={getCityFromCoordinates}>
        {!isCityChanges ? (
          <img src={LocationIcon} alt="Logo" />
        ) : (
          <Spinner radius={30} color={"gray"} stroke={4} visible={true} />
        )}
      </button>
    </StyledCitySearchFrom>
  );
};

export default CitySearchForm;
