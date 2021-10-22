import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Toolbar, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";

const entries = (currentForecast: CurrentForecast) => {
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

export const TableComponent: FunctionComponent<{
  currentForecast: CurrentForecast;
}> = ({ currentForecast }) => {
  console.log("entries", Object.entries(currentForecast));

  return (
    <TableContainer sx={{ width: "unset" }} component={Paper}>
      <Toolbar>
        <Typography>
          Today's forecast ({currentForecast.formattedDate})
        </Typography>
      </Toolbar>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{entries(currentForecast)}</TableHead>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
