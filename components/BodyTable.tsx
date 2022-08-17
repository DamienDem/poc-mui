import { TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import HeaderTable from "./HeaderTable";

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

interface TableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
}

const fetcher = (args: string) => fetch(args).then((res) => res.json());

const BodyTable = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const { data, error } = useSWR("https://swapi.dev/api/planets", fetcher);
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const rows = data.results.map((row: any) => {
    return row;
  });
  
  return (
    <>
      <HeaderTable
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
      />
      <TableBody>
        {rows
          .sort(getComparator(order, orderBy))
          .map((row: any, index: number) => {
            const id = index;
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
                  id={id.toString()}
                  scope="row"
                  sx={{
                    border: "1px solid black",
                  }}
                >
                  {index + 1}
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
                  {row.population}
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
                    {row.gravity}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "block",
                      width: "50%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {row.terrain}
                  </TableCell>
                </TableRow>

                <TableCell
                  sx={{
                    border: "1px solid black",
                  }}
                >
                  {row.climate}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </>
  );
};

export default BodyTable;
