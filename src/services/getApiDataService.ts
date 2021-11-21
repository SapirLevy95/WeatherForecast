const OPEN_WEATHER_APPID = "3dfc3719046ab1bdb560adf66a6afffa";

export const fetchOneCallApi = async (longtitude: number, latitude: number) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&units=metric&appid=${OPEN_WEATHER_APPID}`
  );
};

export const fetchCurrentWeatherDataApi = async (
  longtitude: number,
  latitude: number
) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${OPEN_WEATHER_APPID}`
  );
};
