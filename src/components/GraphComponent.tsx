import { FunctionComponent } from "react";
import {
  Label,
  ArgumentAxis,
  ValueAxis,
  Chart,
  Animation,
  Series,
  Legend,
} from "devextreme-react/chart";
import "react-tabs/style/react-tabs.css";
import { Granularities } from "../enums";

export const GraphComponent: FunctionComponent<{
  forecasts: AllForecasts;
  granularity: Granularities;
}> = ({ forecasts, granularity }) => {
  return (
    <Chart dataSource={forecasts[granularity]}>
      <ArgumentAxis>
        <Label wordWrap="none" overlappingBehavior="stagger" />
      </ArgumentAxis>
      <ValueAxis />
      <Series valueField="temp" argumentField="formattedDate" type="spline" />
      <Animation />
      <Legend visible={false} />
    </Chart>
  );
};

export default GraphComponent;
