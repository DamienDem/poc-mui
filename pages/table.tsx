import {useEffect, useState } from "react";

import useSWR from "swr";
import HeaderTable from "../components/HeaderTable";
import BodyTable from "../components/BodyTable";



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
const fetcher = (args: string) => fetch(args).then((res) => res.json());

const Table = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const { data, error } = useSWR("https://swapi.dev/api/planets", fetcher);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  
  const rows = data.results.map((row: any) => {
    return row;
  });

    return (
      <>
         <HeaderTable
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      <BodyTable
      order={order}
      orderBy={orderBy}
      onRequestSort={handleRequestSort}
      rows={rows}
      />
      </>
    )
}

export default Table;