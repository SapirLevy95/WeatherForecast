import styled from "styled-components";

export const StyledCitySearchFrom = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 200px;

  & .input-city {
    border-top-left-radius: 80px;
    border-bottom-left-radius: 80px;
  }

  & .find-location-button {
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    background: transparent;
    padding-right: 4px;
    padding-left: 2px;
    border: 1px solid #ccc;
  }
  & .location-icon {
    height: 30px;
    width: 30px;
  }
`;
