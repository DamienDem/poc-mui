import { Padding } from "@mui/icons-material";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";


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
    id: "created",
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
    subsection: [/*"Nom", "Siren"*/ "climate", "gravity"],
  },
  {
    id: "diameter",
    label: "CSP",
  },
  {
    id: "edited",
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
    id: "population",
    label: "Alerte",
    subsection: [
      /*`Liées à évolution de montant`,
      `Liées aux fins de durée d'engagement`,*/
      "population",
      "population",
    ],
  },
  {
    id: "films",
    label: "Secret",
  },
];

type Order = "asc" | "desc";

interface TableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}


const HeaderTable = (props: TableProps) => {
  const { order, orderBy, onRequestSort} = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
    const [columnToDisplay, setColumnToDisplay] = useState(() => headCells);
    const displayHandler = (
      event: React.MouseEvent<HTMLElement>,
      newDisplay: HeadCell[],
    ) => {
      setColumnToDisplay(newDisplay);    
    };

   console.log(columnToDisplay);
   


  return (
    <>
      <ToggleButtonGroup
      value={columnToDisplay}
      onChange={displayHandler}
      
      sx={{display: "flex", margin:'2%'}}
      >
        {headCells.map((cell) => {
          
          return (
            <ToggleButton
              value={cell}
              key={cell.label} 
              style={{border:'1px solid black', borderRadius:'5%', margin:'2%', lineHeight: '1rem'}}
            
            >
              {" "}
              {cell.label}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <TableHead>
        <TableRow>
          {headCells.filter(headCell => {
            if(columnToDisplay.includes(headCell)) return true
            else return false
          }).map((headCell) => {
            if (headCell.subsection) {
              return (
                <TableCell
                  style={{
                    border: "1px solid black",
                    padding:0 ,
                    display:'flex',
                    flexDirection:'column',
                    textAlign:'center',
                    height:'100%'
                  }}
                  key={headCell.id}
                >
                  <TableRow >
                    {headCell.label}
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      width: "100%",
                      height:'100%'
                    }}
                  >
                    {headCell.subsection.map((subsection, index) => {
                      return (
                        <TableCell
                          style={{
                            border: "1px solid black",
                            width: "50%",
                            borderWidth: '1px 1px 0 1px',
                            padding:'10%',
                            height:'100%'
                          }}
                          key={index}
                        >
                          <TableSortLabel
                            active={orderBy === subsection}
                            direction={orderBy === subsection ? order : "asc"}
                            onClick={createSortHandler(subsection)}
                          >
                            {subsection}
                          </TableSortLabel>
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
                    direction={orderBy === headCell.id ? order : "asc"}
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
    </>
  );
};

export default HeaderTable;
