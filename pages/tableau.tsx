import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import useSWR from "swr";


const fetcher = (args: string) => fetch(args).then(res => res.json())
const table = () => {
  const {data, error} = useSWR('https://swapi.dev/api/planets', fetcher)
  //console.log(data,error);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const rows = data.results.map(planet => {return planet})
  console.log(rows);
  
  
  return (
    <div>
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Climate</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Diameter</TableCell>
          <TableCell>Film URL</TableCell>
          <TableCell>Gravity</TableCell>
          <TableCell>Orbital_period</TableCell>
          <TableCell>Population</TableCell>
          <TableCell>Rotation_period</TableCell>
          <TableCell>Terrain</TableCell>
          <TableCell>API URL</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name} </TableCell>
            <TableCell>{row.climate} </TableCell>
            <TableCell>{row.created} </TableCell>
            <TableCell>{row.diameter} </TableCell>
            <TableCell>{row.films[0]} </TableCell>
            <TableCell>{row.gravity} </TableCell>
            <TableCell>{row.orbital_period} </TableCell>
            <TableCell>{row.population} </TableCell>
            <TableCell>{row.rotation_period} </TableCell>
            <TableCell>{row.terrain} </TableCell>
            <TableCell>{row.url} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
      
    </div>
  )
}

export default table