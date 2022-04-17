import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";

export const COLUMNS = [
  {
    Header: "ID Grupo",
    accessor: "id_grupo",
  },
  {
    Header: "Turno",
    accessor: "id_turno.nombre",
  },
  {
    Header: "Categoria",
    accessor: "id_categoria.nombre",
  },
  {
    Header: "Fecha Inicio",
    accessor: "fecha_inicio",
  },
  {
    Header: "Fecha Final",
    accessor: "fecha_final",
  },
  {
    Header: "Dia Inicio",
    accessor: "dia_inicio",
  },
  {
    Header: "Dia Final",
    accessor: "dia_final",
  },
  {
    Header: "Editar",
    accessor: () => "editar",
    Cell: (tableProps: any) => (
      <ButtonEdit
        pageProps
        id_grupo={tableProps.row.original.id_grupo}
        id_turno={tableProps.row.original.id_turno.id_turno}
        id_categoria={tableProps.row.original.id_categoria.id_categoria}
        fecha_inicio={tableProps.row.original.fecha_inicio}
        fecha_final={tableProps.row.original.fecha_final}
        dia_inicio={tableProps.row.original.dia_inicio}
        dia_final={tableProps.row.original.dia_final}
      />
    ),
  },
  {
    Header: "Eliminar",
    accessor: () => "delete",
    Cell: (tableProps: any) => (
      <ButtonDelete pageProps id_grupo={tableProps.row.original.id_grupo} />
    ),
  },
];
