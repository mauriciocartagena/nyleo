import { Button } from "@chakra-ui/react";

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
      <Button
        onClick={() => {
          console.log(tableProps.row.original.id_persona);
        }}
      >
        Editar
      </Button>
    ),
  },
  {
    Header: "Eliminar",
    accessor: () => "delete",
    Cell: (tableProps: any) => (
      <Button
        onClick={() => {
          console.log(tableProps.row.original.id_persona);
        }}
      >
        Eliminar
      </Button>
    ),
  },
];
