import { Button } from "@chakra-ui/react";
import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";

export const COLUMNS = [
  {
    Header: "ID Persona",
    accessor: "id_persona",
  },
  {
    Header: "Nombre",
    accessor: "nombre",
  },
  {
    Header: "Primer Apellido",
    accessor: "primer_apellido",
  },
  {
    Header: "Segundo Apellido",
    accessor: "segundo_apellido",
  },
  {
    Header: "DNI",
    accessor: "dni",
  },
  {
    Header: "Numero",
    accessor: "numero",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Editar",
    accessor: () => "editar",
    Cell: (tableProps: any) => (
      <ButtonEdit pageProps id_persona={tableProps.row.original.id_persona} />
    ),
  },
  {
    Header: "Eliminar",
    accessor: () => "delete",
    Cell: (tableProps: any) => (
      <ButtonDelete pageProps id_persona={tableProps.row.original.id_persona} />
    ),
  },
];
