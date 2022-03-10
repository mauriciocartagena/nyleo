import ButtonEdit from "./ButtonEdit";

export const COLUMNS = [
  {
    Header: "ID Turno",
    accessor: "id_turno",
  },
  {
    Header: "Nombre",
    accessor: "nombre",
  },
  {
    Header: "Hora Inicio",
    accessor: "hora_inicio",
  },
  {
    Header: "Hora Final",
    accessor: "hora_final",
  },
  {
    Header: "Editar",
    accessor: () => "editar",
    Cell: (tableProps: any) => (
      <ButtonEdit
        pageProps
        id_turno={tableProps.row.original.id_turno}
        nombre={tableProps.row.original.nombre}
        hora_inicio={tableProps.row.original.hora_inicio}
        hora_final={tableProps.row.original.hora_final}
      />
    ),
  },
];
