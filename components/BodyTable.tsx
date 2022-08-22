import { TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";

type Order = "asc" | "desc";

const descendingComparator = <T extends unknown>(
  a: T,
  b: T,
  orderBy: keyof T
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

interface Data {
  chronoNumber: number;
  CSM: string;
  status: string;
  Typology: string;
  name: string;
  SIREN: string;
  CSP: string;
  timePeriod: string;
  timePeriodProlonged: string;
  price: number;
  priceEvolve: string;
  commitmentPeriod: string;
  secret: string;
}

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

interface HeadCell {
  id: string;
  label: string;
  subsection?: string[];
}

interface TableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rows: any[];
}

const BodyTable = (props: TableProps) => {
  const { order, orderBy,rows } = props;

  return (
    <>
      <TableBody>
        {rows?.sort(getComparator(order, orderBy)).map((row: any) => {
          return (
            <TableRow
              key={row.name}
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <TableCell
                component="th"
                id={row.created}
                scope="row"
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.created}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.url}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.terrain}
              </TableCell>
              <TableRow
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  height: "100%",
                  border: "1px solid black",
                }}
              >
                <TableCell
                  sx={{
                    borderRight: "1px solid black",
                    width: "50%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                >
                  {row.climate}
                </TableCell>
                <TableCell
                  sx={{
                    display: "block",
                    width: "50%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {row.gravity}
                </TableCell>
              </TableRow>

              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.diameter}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.edited}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.orbital_period}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.rotation_period}
              </TableCell>

              <TableRow
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  height: "100%",
                  border: "1px solid black",
                }}
              >
                <TableCell
                  sx={{
                    borderRight: "1px solid black",
                    width: "50%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                >
                  {row.population}
                </TableCell>
                <TableCell
                  sx={{
                    display: "block",
                    width: "50%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {row.population}
                </TableCell>
              </TableRow>

              <TableCell
                sx={{
                  border: "1px solid black",
                }}
              >
                {row.films[0]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default BodyTable;
