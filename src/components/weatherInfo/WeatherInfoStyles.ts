import styled from "styled-components";

export const StyledWeatherInfo = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  & .city-title {
    margin-bottom: 10px;
  }
  & .weather-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
  }
`;
