import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

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

interface HeadCell {
  id: string;
  label: string;
  subsection?: string[];
}

const headCells: HeadCell[] = [
  {
    id: "N° chrono",
    label: "N° chrono",
  },
  {
    id: "name",
    label: "CSM",
  },
  {
    id: "url",
    label: "Statut",
  },
  {
    id: "terrain",
    label: "Typologie",
  },
  {
    id: "climate",
    label: "Bénéficiaire",
    subsection: ["Nom", "Siren"],
  },
  {
    id: "diameter",
    label: "CSP",
  },
  {
    id: "population",
    label: "Délai concerné",
  },
  {
    id: "orbital_period",
    label: "Délai pronlongé",
  },
  {
    id: "rotation_period",
    label: "Montants",
  },
  {
    id: "Alerte",
    label: "Alerte",
    subsection: [
      `Liées à évolution de montant`,
      `Liées aux fins de durée d'engagement`,
    ],
  },
  {
    id: "Secret",
    label: "Secret",
  },
];

type Order = "asc" | "desc";

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

const HeaderTable = (props: TableProps) => {
  const { order, orderBy,onRequestSort } = props;
    const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (headCell.subsection) {
            return (
              <TableCell
                sx={{
                  border: "1px solid black",
                  padding: "0",
                }}
                key={headCell.id}
              >
                <TableRow sx={{ display: "flex", justifyContent: "center" }}>
                  {headCell.label}
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  {headCell.subsection.map((subsection, index) => {
                    return (
                      <TableCell
                        sx={{
                          border: "1px solid black",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                          height: "100%",
                          minHeight: "90px",
                        }}
                        key={index}
                      >
                        {subsection}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableCell>
            );
          } else {
            return (
              <TableCell
                sx={{
                  border: "1px solid black",
                }}
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
};

export default HeaderTable;
