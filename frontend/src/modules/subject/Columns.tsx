import ButtonEdit from "./ButtonEdit";

export const COLUMNS = [
  {
    Header: "ID Categoria",
    accessor: "id_categoria",
  },
  {
    Header: "Nombre",
    accessor: "nombre",
  },
  {
    Header: "Editar",
    accessor: () => "editar",
    Cell: (tableProps: any) => (
      <ButtonEdit
        pageProps
        id_categoria={tableProps.row.original.id_categoria}
        nombre={tableProps.row.original.nombre}
      />
    ),
  },
];
