import { FunctionComponent, useState } from "react";
import CITIES from "../data/city.list.json";
import Input from "@reactmaker/react-autocorrect-input";
import { getCityFromAPI } from "../services/openWeatherService";
import LocationIcon from "../icons/locationIcon.png";
import Spinner from "react-spinner-material";

const CITIES_NAMES = CITIES.map((city: City) => city.name);

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
        {!isCityChanges ? (
          <img
            style={{ height: 30, width: 30 }}
            src={LocationIcon}
            alt="Logo"
          />
        ) : (
          <Spinner radius={30} color={"gray"} stroke={4} visible={true} />
        )}
      </button>
    </div>
  );
};

export default CitySearchForm;
