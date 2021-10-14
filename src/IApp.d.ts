declare module "*.json" {
  const value: any;
  export default value;
}

declare module "@reactmaker/react-autocorrect-input" {
  const value: any;
  export default value;
}

declare module "@devexpress/dx-react-chart-material-ui" {
  const value: any;
  export default value;
}
declare module "@material-ui/core/Paper" {
  const value: any;
  export default value;
}

export interface City {
  id: number;
  name: string;
  coord: { lon: number; lat: number };
}
export interface Forecast {
  date: date;
  temp: number;
}
