import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Toolbar, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";

export const CurrentWeatherTable: FunctionComponent<{
  currentForecast: CurrentForecast;
}> = ({ currentForecast }) => {
  const renderRows = () => {
    const rowData = {
      Temperature: currentForecast.temp,
      "Feels like": currentForecast.feelsLike,
      Humidity: currentForecast.humidity,
      Sunrise: currentForecast.sunrise,
      Sunstet: currentForecast.sunset,
    };
    return Object.entries(rowData).map(([key, value]) => (
      <TableRow key={key}>
        <TableCell>{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer sx={{ width: "unset" }} component={Paper}>
      <Toolbar>
        <Typography>
          Today's forecast ({currentForecast.formattedDate})
        </Typography>
      </Toolbar>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{renderRows()}</TableHead>
      </Table>
    </TableContainer>
  );
};

export default CurrentWeatherTable;
